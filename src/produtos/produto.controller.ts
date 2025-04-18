/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid'
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoRepository: ProdutoRepository) {}
  @Post()
  async criarProduto(@Body() dadosDoProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity()

    produtoEntity.id = uuid();
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.usuarioId = dadosDoProduto.usuarioId;
    produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.categoria = dadosDoProduto.categoria;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.quantidade = dadosDoProduto.quantidade;
    produtoEntity.valor = dadosDoProduto.valor;

    const produtoCadastrado = this.produtoRepository.salvar(produtoEntity);
    console.log(produtoEntity.usuarioId);
    
    return {
      produto: produtoCadastrado,
      mensagem: 'Produto criado com sucesso'
    }
  }

  @Get()
  async listProdutos() {
    return this.produtoRepository.listTodos();
  }
 
  @Put('/:id')
  async atualizarProdutos(@Param('id') id: string, @Body() novosDados: AtualizaProdutoDTO) {
    const produtoAtualizado = await this.produtoRepository.atualizar(id, novosDados)

    return {
      produto: produtoAtualizado,
      mensagem: 'produto atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async removeProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id)

    return {
      produto: produtoRemovido,
      mensagem: 'produto removido com'
    }
  }

}
