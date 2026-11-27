
import { Loan as PrismaLoan } from '@prisma/client';
import { ICreateLoanDTO } from '../dtos/loan.dto';

export type LoanStatus = PrismaLoan['estado'];

export interface Loan {
  id: string;
  roomId: PrismaLoan['roomId'];
  instructorId: PrismaLoan['instructorId'];
  guardaId: PrismaLoan['guardaId'];
  numeroPc: PrismaLoan['numeroPc'];
  estado: LoanStatus;
  createdAt: string;
  acceptedAt: string | null;
}

export interface LoanFilters {
  roomId?: string;
}

export interface LoanRepository {
  create(input: ICreateLoanDTO): Promise<Loan>;
  findAll(filters?: LoanFilters): Promise<Loan[]>;
  findById(id: string): Promise<Loan | null>;
  updateStatus(
    id: string,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null>;
}
