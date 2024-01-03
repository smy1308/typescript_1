import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { User } from 'src/user/entities/user.entity';
import { Performance } from 'src/performance/entities/performance.entity';
import { Booking } from 'src/booking/entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  // 예약 신청
  async create(user: User, performanceId: number, bookingDto: BookingDto) {
    const performance = await this.performanceRepository.findOne({
      where: { id: performanceId },
    });

    if (!performance) {
      throw new NotFoundException('공연이 존재하지 않습니다.');
    }

    if (performance.seat <= 0) {
      throw new BadRequestException('선택 가능한 좌석이 없습니다.');
    }

    const existBooking = await this.bookingRepository.findOne({
      where: {
        user: { id: user.id },
        performance: { id: performanceId },
      },
    });

    if (existBooking) {
      throw new BadRequestException('이미 예매중입니다.');
    }

    if (user.point < performance.price) {
      throw new BadRequestException('포인트가 부족합니다.');
    }

    // 예약시 유저 포인트 감소
    user.point -= performance.price;
    await this.userRepository.save(user);

    // 예약마다 seat 감소
    performance.seat--;
    await this.performanceRepository.save(performance);

    const booking = new Booking();
    booking.user = user;
    booking.performance = performance;
    booking.bookingDate = new Date();
    await this.bookingRepository.save(booking);

    return {
      bookingDate: booking.bookingDate,
      performanceTitle: performance.title,
      performanceDate: performance.date,
      location: performance.location,
      price: performance.price,
    };
  }

  // 예약 내역 확인
  async getBookingList(userId: number): Promise<Booking[]> {
    return await this.bookingRepository.find({
      where: { user_id: userId },
      order: { id: 'DESC' },
    });
  }

  // 예약 취소
  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
