import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Performance } from 'src/performance/entities/performance.entity';

@Entity({
  name: 'bookings',
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  bookingDate: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Performance, (performance) => performance.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'performance_id' })
  performance: Performance;

  @Column({ type: 'bigint', name: 'performance_id' })
  performance_id: number;
}
