import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produtos/produto.module';
@Module({
  imports: [UsuarioModule, ProdutoModule],
})
export class AppModule {}
