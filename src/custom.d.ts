// src/custom.d.ts (ou qualquer nome que você preferir)

import { Request } from 'express';

// Defina a interface do payload do JWT que você está utilizando
interface DecodedToken {
  userId: string;  // ou outro campo que você esteja usando no payload do JWT
}

// Estenda a interface Request para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;  // Agora o TypeScript sabe que existe a propriedade 'user' em 'Request'
    }
  }
}
