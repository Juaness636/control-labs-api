
import { Prisma, PrismaClient, Loan as PrismaLoan } from '@prisma/client';
import { ICreateLoanDTO } from '../dtos/loan.dto';
import { DomainError } from '../errors/domain.error';
import {
  Loan,
  LoanFilters,
  LoanRepository,
  LoanStatus
} from './loan.repository';

export class PrismaLoanRepository implements LoanRepository {
  constructor(private readonly database: PrismaClient) {}

  public async create(input: ICreateLoanDTO): Promise<Loan> {
    try {
      const loan = await this.database.loan.create({
        data: {
          roomId: input.roomId,
          instructorId: input.instructorId,
          guardaId: input.guardaId,
          numeroPc: input.numeroPc
        }
      });

      return this.toDomain(loan);
    } catch (error) {
      if (this.isConstraintError(error)) {
        throw new DomainError(
          'VALIDATION_ERROR',
          'Los datos del préstamo incumplen una restricción de la base de datos.'
        );
      }

      throw error;
    }
  }

  public async findAll(filters: LoanFilters = {}): Promise<Loan[]> {
    const loans = await this.database.loan.findMany({
      where: filters.roomId ? { roomId: filters.roomId } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    return loans.map(loan => this.toDomain(loan));
  }

  public async findById(id: string): Promise<Loan | null> {
    const loan = await this.database.loan.findUnique({
      where: { id: BigInt(id) }
    });

    return loan ? this.toDomain(loan) : null;
  }

  public async updateStatus(
    id: string,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null> {
    const changed = await this.database.loan.updateMany({
      where: {
        id: BigInt(id),
        estado: expectedStatus
      },
      data: {
        estado: status,
        acceptedAt: status === 'APROBADO_Y_FIRMADO' ? new Date() : null
      }
    });

    return changed.count === 0 ? null : this.findById(id);
  }

  private isConstraintError(error: unknown): boolean {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return error.code === 'P2003' || error.code === 'P2004';
    }

    return error instanceof Prisma.PrismaClientUnknownRequestError
      && error.message.includes('23514');
  }

  private toDomain(loan: PrismaLoan): Loan {
    return {
      id: loan.id.toString(),
      roomId: loan.roomId,
      instructorId: loan.instructorId,
      guardaId: loan.guardaId,
      numeroPc: loan.numeroPc,
      estado: loan.estado as LoanStatus,
      createdAt: loan.createdAt.toISOString(),
      acceptedAt: loan.acceptedAt?.toISOString() ?? null
    };
  }
}
