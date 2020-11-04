import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
