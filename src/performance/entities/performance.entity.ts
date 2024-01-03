import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from 'src/booking/entities/booking.entity';

@Entity({
  name: 'performances',
})
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({
    type: 'varchar',
    nullable: false,
    transformer: { to: JSON.stringify, from: JSON.parse },
  })
  date: string[];

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @OneToMany(() => Booking, (booking) => booking.performance)
  bookings: Booking[];
}
