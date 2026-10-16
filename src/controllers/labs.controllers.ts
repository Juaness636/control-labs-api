import { Request, Response } from 'express';

export class labsController {
  public static createLab = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de Ambientes todavía no está implementado.'
    });
  };

  public static getLabsByFilter = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'Obter Ambientes todavía no está implementada.'
    });
  };


  public static acceptLabInventory  = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La actualización de  AmbienteS ${id} todavía no está implementada.`
    });
  };

}

                