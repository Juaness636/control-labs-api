import { Request, Response } from 'express';

export class equpimentsController {
  public static createequpiment = (req: Request, res: Response): void => {
    // TODO: llamar al servicio con req.body y responder 201 con el préstamo creado.
    res.status(501).json({
      success: false,
      message: 'El registro de Equipos todavía no está implementado.'
    });
  };

  public static getequpimentsByFilter = (req: Request, res: Response): void => {
    // TODO: tomar los filtros de req.query, llamar al servicio y responder con los resultados.
    res.status(501).json({
      success: false,
      message: 'Obter Equipos todavía no está implementada.'
    });
  };


  public static acceptLabInventory  = (req: Request, res: Response): void => {
    const { id } = req.params;
    // TODO: pasar id a la operación de aceptación y responder con el resultado.
    res.status(501).json({
      success: false,
      message: `La actualización de estado del equipo ${id} todavía no está implementada.`
    });
  };

}

                