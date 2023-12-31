import { PedidoEntity } from '@/domain/entities';
import { IPagamentoPedido } from '@/domain/use-cases';
import { Controller, Inject, Param, Patch } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Pagamentos')
@Controller('pedidos/:id/pagamentos')
export class PagamentoController {
  constructor(
    @Inject(IPagamentoPedido)
    private readonly pagamentoPedido: IPagamentoPedido,
  ) {}

  @ApiParam({ name: 'id' })
  @Patch()
  async payment(@Param('id') id: string): Promise<PedidoEntity> {
    return this.pagamentoPedido.execute(id);
  }
}
