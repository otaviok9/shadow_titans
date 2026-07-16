class Cutscene {
    constructor() {
        this.falas        = []
        this.indice       = 0
        this.textoCorrendo = ''
        this.textoCompleto = ''
        this.contador     = 0
        this.velTexto     = 2   // frames por caractere
        this.podeAvancar  = false
        this.fundoAtual   = null // Image() atual
        this.IMG          = {}   // referência ao dicionário de imagens
        this.aoTerminar   = null
    }
 
    iniciar(falas, IMG, aoTerminar) {
        this.falas      = falas
        this.IMG        = IMG
        this.aoTerminar = aoTerminar
        this.indice     = 0
        this._carregarFala(0)
    }
 
    _carregarFala(i) {
        if (i >= this.falas.length) {
            if (this.aoTerminar) this.aoTerminar()
            return
        }
        let f = this.falas[i]
        this.textoCompleto  = f.fala
        this.textoCorrendo  = ''
        this.contador       = 0
        this.podeAvancar    = false
        // Troca o fundo se a fala especificar um diferente
        if (f.fundo && this.IMG[f.fundo]) {
            this.fundoAtual = this.IMG[f.fundo]
        }
    }
 
    atualiza() {
        if (this.textoCorrendo.length < this.textoCompleto.length) {
            this.contador++
            if (this.contador >= this.velTexto) {
                this.contador = 0
                this.textoCorrendo += this.textoCompleto[this.textoCorrendo.length]
            }
        } else {
            this.podeAvancar = true
        }
    }
 
    avancar() {
        // Primeiro clique completa o texto; segundo avança
        if (this.textoCorrendo.length < this.textoCompleto.length) {
            this.textoCorrendo = this.textoCompleto
            this.podeAvancar   = true
            return
        }
        this.indice++
        if (this.indice >= this.falas.length) {
            if (this.aoTerminar) this.aoTerminar()
        } else {
            this._carregarFala(this.indice)
        }
    }
 
    // Quebra texto em linhas que cabem na largura dada
    _quebrar(texto, maxW) {
        let palavras = texto.split(' ')
        let linhas = [], atual = ''
        palavras.forEach(p => {
            let teste = atual ? atual + ' ' + p : p
            if (des.measureText(teste).width < maxW) {
                atual = teste
            } else {
                if (atual) linhas.push(atual)
                atual = p
            }
        })
        if (atual) linhas.push(atual)
        return linhas
    }
 
    desenha() {
        // ── FUNDO ──────────────────────────────────────────────
        if (this.fundoAtual && this.fundoAtual.complete && this.fundoAtual.naturalWidth > 0) {
            des.drawImage(this.fundoAtual, 0, 0, 1200, 700)
        } else {
            des.fillStyle = '#0a0a2a'
            des.fillRect(0, 0, 1200, 700)
        }
        // Overlay leve para contraste
        des.fillStyle = 'rgba(0,0,0,0.32)'
        des.fillRect(0, 0, 1200, 700)
 
        if (this.indice >= this.falas.length) return
 
        let f   = this.falas[this.indice]
        let cor = f.cor || '#4fc3f7'
 
        // ── CAIXA DE DIÁLOGO ───────────────────────────────────
        let bX = 30, bY = 530, bW = 1140, bH = 158
 
        // Sombra
        des.fillStyle = 'rgba(0,0,0,0.65)'
        des.fillRect(bX + 5, bY + 5, bW, bH)
 
        // Fundo gradiente
        let g = des.createLinearGradient(bX, bY, bX, bY + bH)
        g.addColorStop(0, 'rgba(4,8,38,0.97)')
        g.addColorStop(1, 'rgba(0,4,22,0.99)')
        des.fillStyle = g
        des.fillRect(bX, bY, bW, bH)
 
        // Borda colorida
        des.strokeStyle = cor
        des.lineWidth   = 2.5
        des.strokeRect(bX, bY, bW, bH)
 
        // Borda interna sutil
        des.strokeStyle = 'rgba(255,255,255,0.07)'
        des.lineWidth   = 1
        des.strokeRect(bX + 4, bY + 4, bW - 8, bH - 8)
 
        // ── BADGE DO NOME ──────────────────────────────────────
        des.font = '12px "Press Start 2P"'
        let nomeTxt  = f.personagem.toUpperCase()
        let nomeLarg = des.measureText(nomeTxt).width + 26
 
        des.fillStyle   = 'rgba(4,8,38,0.97)'
        des.fillRect(bX + 12, bY - 24, nomeLarg, 28)
        des.strokeStyle = cor
        des.lineWidth   = 2
        des.strokeRect(bX + 12, bY - 24, nomeLarg, 28)
        des.fillStyle   = cor
        des.textAlign   = 'left'
        des.fillText(nomeTxt, bX + 25, bY - 5)
 
        // ── ÍCONE / AVATAR ─────────────────────────────────────
        let ax = bX + 55, ay = bY + bH / 2
        let raioAvatar = 40

        // Foto do personagem (mesma foto usada na seleção do 1 V 1), recortada em círculo
        let fotoPersonagem = (typeof IMG_PERSONAGENS !== 'undefined') ? IMG_PERSONAGENS[f.personagem] : null
        let temFoto = !!(fotoPersonagem && fotoPersonagem.complete && fotoPersonagem.naturalWidth > 0)

        des.save()
        des.beginPath()
        des.arc(ax, ay, raioAvatar, 0, Math.PI * 2)
        des.clip()
        des.fillStyle = 'rgba(0,0,0,0.45)'
        des.fillRect(ax - raioAvatar, ay - raioAvatar, raioAvatar * 2, raioAvatar * 2)
        if (temFoto) {
            des.drawImage(fotoPersonagem, ax - raioAvatar, ay - raioAvatar, raioAvatar * 2, raioAvatar * 2)
        }
        des.restore()

        des.beginPath()
        des.arc(ax, ay, raioAvatar, 0, Math.PI * 2)
        des.strokeStyle = cor
        des.lineWidth   = 2
        des.stroke()

        // Sem foto disponível (ex.: Narrador) → mantém as iniciais como antes
        if (!temFoto) {
            des.fillStyle = cor
            des.font      = '12px "Press Start 2P"'
            des.textAlign = 'center'
            des.fillText(f.personagem.substring(0, 2).toUpperCase(), ax, ay + 5)
        }
 
        // ── TEXTO DA FALA ──────────────────────────────────────
        des.font      = '13px "Press Start 2P"'
        des.textAlign = 'left'
        des.fillStyle = 'rgba(255,255,255,0.94)'
        let linhas = this._quebrar(this.textoCorrendo, bW - 130)
        linhas.slice(0, 4).forEach((l, i) => {
            des.fillText(l, bX + 112, bY + 42 + i * 30)
        })
 
        // ── INDICADOR "CONTINUAR" ──────────────────────────────
        if (this.podeAvancar) {
            let a = 0.4 + 0.6 * Math.abs(Math.sin(Date.now() / 420))
            des.globalAlpha = a
            des.fillStyle   = cor
            des.font        = '9px "Press Start 2P"'
            des.textAlign   = 'right'
            des.fillText('▶ ENTER ou CLIQUE', bX + bW - 14, bY + bH - 12)
            des.globalAlpha = 1
        }
 
        des.textAlign = 'left'
    }
}