
import { prisma } from './db/prisma';

import { LoanService } from './services/loan.service';
import { PrismaLoanRepository } from './repositories/prisma-loan.repository';

import { UserService } from './services/users.service';
import { PrismaUserRepository } from './repositories/prisma-users.repository';

// Loans
const loanRepository = new PrismaLoanRepository(prisma);
export const loanService = new LoanService(loanRepository);

// Users
const userRepository = new PrismaUserRepository(prisma);
export const userService = new UserService(userRepository);