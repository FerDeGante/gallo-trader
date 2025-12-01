import { NextResponse } from 'next/server';
import { AppError } from './errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any> = {
  data?: T;
  error?: {
    message: string;
    code?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};

export function successResponse<T>(data: T, meta?: ApiResponse['meta']) {
  return NextResponse.json({
    data,
    ...(meta && { meta }),
  } as ApiResponse<T>);
}

export function errorResponse(error: Error | AppError, statusCode = 500) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
        },
      } as ApiResponse,
      { status: error.statusCode }
    );
  }

  // Error genérico - no exponer detalles en producción
  const message =
    process.env.NODE_ENV === 'development'
      ? error.message
      : 'Error interno del servidor';

  console.error('Error no manejado:', error);

  return NextResponse.json(
    {
      error: {
        message,
        code: 'INTERNAL_ERROR',
      },
    } as ApiResponse,
    { status: statusCode }
  );
}
