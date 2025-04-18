/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  listTodos() {
    return this.produtos;
  }

  salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
    return produto
  }

  async atualizar(id: string, dadosDeAtualizacao: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId']
    const produto = this.buscaPorId(id)

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (dadosNaoAtualizaveis.includes(chave)) {
        return
      }
      produto[chave] = valor
    })
    return produto
  }

  async remove(id: string) {
    const produto = this.buscaPorId(id);
    this.produtos = this.produtos.filter(
      (produto) => produto.id !== id,      
    );
    return produto
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find(
      produtoSalvo => produtoSalvo.id === id
    );
    if (!possivelProduto) {
      throw new Error('Produto não existe')
    }
    return possivelProduto
  }

}
