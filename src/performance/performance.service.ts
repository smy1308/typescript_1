import _ from 'lodash';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
  ) {}

  // 생성
  async create(createPerformanceDto: CreatePerformanceDto) {
    return await this.performanceRepository.save(createPerformanceDto);
  }

  // 조회
  async findAll(): Promise<Performance[]> {
    return await this.performanceRepository.find({
      select: ['id', 'title'],
    });
  }

  // 검색
  async findByTitle(title: string): Promise<Performance[]> {
    return await this.performanceRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
      select: ['id', 'title'],
    });
  }

  // 상세 조회
  async findOne(id: number) {
    const performanceDetail = await this.verifyPerformanceById(id);

    return {
      performanceDetail,
    };
  }

  // 수정
  update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
    return `This action updates a #${id} performance`;
  }

  // 삭제
  remove(id: number) {
    return `This action removes a #${id} performance`;
  }

  // id로 공연 검증
  private async verifyPerformanceById(id: number) {
    const performance = await this.performanceRepository.findOneBy({ id });
    if (_.isNil(performance)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return performance;
  }
}
