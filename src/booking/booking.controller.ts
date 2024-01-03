import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserInfo } from 'src/utils/userInfo.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // 예약 신청
  @Post(':performanceId')
  async create(
    @UserInfo() user: User,
    @Param('performanceId') performanceId: number,
    @Body() bookingDto: BookingDto,
  ) {
    return await this.bookingService.create(user, performanceId, bookingDto);
  }

  // 예약 내역 확인
  @Get()
  async getBookingList(@UserInfo() user: User) {
    const userId = user.id;
    return await this.bookingService.getBookingList(userId);
  }

  // 예약 취소
  @Delete(':id')
  async remove(@UserInfo() user: User, @Param('id') id: string) {
    return await this.bookingService.remove(+id);
  }
}
