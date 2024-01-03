import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
