class Vilao extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.vida = 10
        this.vidaMax = 10
        this.velY = 1.5
        this.timerTiro = 0
        this.intervalTiro = 80 // frames entre rajadas
        this.timerMostraAtirando = 0 // <── frames restantes mostrando o sprite de atirando
        this.transformado = false // <── 2ª forma do Zul'Kahr (Fase 4): ativa a aura sombria diferente

        // Controle pelo Jogador 2 (modo 1 V 1) — apenas movimento vertical
        this.dirY = 0
        this.velJogador = 5
        this.cooldownTiro = 0
        this.timerSpriteAtirando = 0 // <── frames restantes mostrando o sprite "atirando" (modo 1 V 1)
    }

    mov() {
        // ── ZUL'KAHR (chefão final, Fase 4): movimento mais rápido e imprevisível ──
        // As demais fases continuam com o comportamento original, sem nenhuma alteração.
        if (typeof fase !== 'undefined' && fase === 4) {
            this.y += this.velY
            if (this.y <= 10) { this.y = 10; this.velY = Math.abs(this.velY) }
            if (this.y >= 700 - this.h - 10) { this.y = 700 - this.h - 10; this.velY = -Math.abs(this.velY) }

            // De tempos em tempos muda de direção/velocidade do nada (imprevisível)
            this._timerImprevisto = (this._timerImprevisto || 0) - 1
            if (this._timerImprevisto <= 0) {
                this._timerImprevisto = 40 + Math.floor(Math.random() * 50)
                let furia = this.vida <= this.vidaMax / 2
                let base = furia ? 6 : 4 // na fúria final (vida ≤ metade), fica ainda mais rápido
                let sinal = Math.random() < 0.5 ? 1 : -1
                this.velY = sinal * (base + Math.random() * 2)
            }

            if (this.timerTiro > 0) this.timerTiro--
            if (this.timerMostraAtirando > 0) this.timerMostraAtirando--
            return
        }

        // Movimenta verticalmente sozinho, rebate nas bordas
        this.y += this.velY
        if (this.y <= 10) {
            this.y = 10
            this.velY *= -1
        }
        if (this.y >= 700 - this.h - 10) {
            this.y = 700 - this.h - 10
            this.velY *= -1
        }
        if (this.timerTiro > 0) this.timerTiro--
        if (this.timerMostraAtirando > 0) this.timerMostraAtirando--
    }

    // Movimento do Jogador 2 no modo 1 V 1: somente para cima/baixo (sem esquerda/direita)
    mov_jogador() {
        this.y += this.dirY * this.velJogador

        // Limites da tela (apenas eixo vertical)
        if (this.y < 0) this.y = 0
        if (this.y > 700 - this.h) this.y = 700 - this.h

        if (this.cooldownTiro > 0) this.cooldownTiro--
        if (this.timerSpriteAtirando > 0) this.timerSpriteAtirando--
    }

    // Retorna true se é hora de atirar
    podeAtirar() {
        if (this.timerTiro <= 0) {
            this.timerTiro = this.intervalTiro
            this.timerMostraAtirando = 18 // <── frames que o sprite de atirando fica visível
            return true
        }
        return false
    }

    // Desenha o vilão - figura robótica maligna / vilão
    des_vilao() {
        // <── MODO 1 V 1: usa os sprites do personagem escolhido na seleção, sem
        //     mexer no desenho por fase usado no modo história (abaixo)
        if (typeof modo1v1 !== 'undefined' && modo1v1 && typeof sel1v1 !== 'undefined' && sel1v1.vilao) {
            let sprites = SPRITES_1V1[sel1v1.vilao]
            if (sprites) {
                let img
                if (this.timerSpriteAtirando > 0 && sprite_ok(sprites.atirando)) {
                    img = sprites.atirando
                } else {
                    let quadro = Math.floor(frameSprite1v1 / 20) % 2 === 0 ? sprites.parado1 : sprites.parado2
                    img = sprite_ok(quadro) ? quadro : (sprite_ok(sprites.parado1) ? sprites.parado1 : sprites.parado2)
                }
                if (sprite_ok(img)) {
                    des.drawImage(img, this.x, this.y, this.w, this.h)
                    return
                }
            }
        }

        // <── escolhe o sprite do vilão conforme a fase (Doutor Solaris, Senhor X, General Shade)
        let parados = null, atirando = null
        if (fase === 1) {
            parados  = [IMG.vilao_fase1_parado1, IMG.vilao_fase1_parado2, IMG.vilao_fase1_parado3]
            atirando = IMG.vilao_fase1_atirando
        } else if (fase === 2) {
            parados  = [IMG.vilao_fase2_parado1, IMG.vilao_fase2_parado2, IMG.vilao_fase2_parado3]
            atirando = IMG.vilao_fase2_atirando
        } else if (fase === 3) {
            parados  = [IMG.vilao_fase3_parado1, IMG.vilao_fase3_parado2, IMG.vilao_fase3_parado3]
            atirando = IMG.vilao_fase3_atirando
        } else if (fase === 4) {
            parados  = [IMG.vilao_fase4_parado1, IMG.vilao_fase4_parado2, IMG.vilao_fase4_parado3]
            atirando = IMG.vilao_fase4_atirando
        }

        let quadro = null
        if (parados) {
            quadro = (this.timerMostraAtirando > 0)
                ? atirando
                : parados[Math.floor(Date.now() / 220) % parados.length]
        }

        // ── AURA DO ZUL'KAHR (Fase 4) ────────────────────────────
        // 1ª forma: brilho vermelho sutil. 2ª forma (this.transformado,
        // depois da transição no meio da luta): aura roxa/sombria mais
        // forte e pulsante, com um anel de energia ao redor.
        if (fase === 4) {
            let cxA = this.x + this.w / 2
            let cyA = this.y + this.h / 2
            des.save()
            if (this.transformado) {
                let pulso = 0.35 + 0.25 * Math.abs(Math.sin(Date.now() / 200))
                let grad = des.createRadialGradient(cxA, cyA, 10, cxA, cyA, this.w * 1.3)
                grad.addColorStop(0, 'rgba(255,0,255,0.9)')
                grad.addColorStop(0.5, 'rgba(119,0,255,0.55)')
                grad.addColorStop(1, 'rgba(119,0,255,0)')
                des.globalAlpha = pulso
                des.fillStyle = grad
                des.beginPath()
                des.arc(cxA, cyA, this.w * 1.3, 0, Math.PI * 2)
                des.fill()

                des.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(Date.now() / 150))
                des.strokeStyle = '#ff33ff'
                des.lineWidth = 3
                des.beginPath()
                des.arc(cxA, cyA, this.w * 0.95 + 6 * Math.sin(Date.now() / 180), 0, Math.PI * 2)
                des.stroke()
            } else {
                des.globalAlpha = 0.18 + 0.12 * Math.abs(Math.sin(Date.now() / 400))
                des.fillStyle = '#ff2200'
                des.beginPath()
                des.arc(cxA, cyA, this.w * 0.8, 0, Math.PI * 2)
                des.fill()
            }
            des.restore()
        }

        if (quadro && quadro.complete && quadro.naturalWidth > 0) {

            let sw = this.w * 1.8, sh = this.h * 1.8

            let cx0 = this.x + this.w / 2
            let cy0 = this.y + this.h / 2
            des.drawImage(quadro, cx0 - sw / 2, cy0 - sh / 2, sw, sh)
            return
        }

        // Fallback (sprite ainda não carregado ou fase sem sprite próprio): desenho original
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        // Aura malígna ao redor
        des.globalAlpha = 0.15 + 0.1 * Math.abs(Math.sin(Date.now() / 400))
        des.fillStyle = '#ff2200'
        des.beginPath()
        des.arc(cx, cy, this.w * 0.7, 0, Math.PI * 2)
        des.fill()
        des.globalAlpha = 1

        // Corpo central
        des.fillStyle = '#3a0000'
        des.fillRect(this.x + 10, this.y + 12, this.w - 20, this.h - 18)

        // Ombros largos e ameaçadores
        des.fillStyle = '#5a0000'
        des.fillRect(this.x, this.y + 10, 14, 35)
        des.fillRect(this.x + this.w - 14, this.y + 10, 14, 35)

        // Spikes nos ombros
        des.fillStyle = '#ff2200'
        des.beginPath()
        des.moveTo(this.x, this.y + 10)
        des.lineTo(this.x - 8, this.y)
        des.lineTo(this.x + 14, this.y + 10)
        des.fill()
        des.beginPath()
        des.moveTo(this.x + this.w, this.y + 10)
        des.lineTo(this.x + this.w + 8, this.y)
        des.lineTo(this.x + this.w - 14, this.y + 10)
        des.fill()

        // Capacete/cabeça
        des.fillStyle = '#1a0000'
        des.fillRect(this.x + 14, this.y, this.w - 28, 24)

        // Olhos brilhantes (2 olhos vermelhos)
        des.fillStyle = '#ff0000'
        des.fillRect(this.x + 18, this.y + 7, 14, 8)
        des.fillRect(this.x + this.w - 32, this.y + 7, 14, 8)

        // Brilho nos olhos
        des.fillStyle = '#ffaa00'
        des.fillRect(this.x + 20, this.y + 8, 5, 4)
        des.fillRect(this.x + this.w - 30, this.y + 8, 5, 4)

        // Detalhes do peito - energia
        des.fillStyle = '#ff4400'
        des.fillRect(cx - 10, cy - 6, 20, 4)
        des.fillRect(cx - 6, cy + 2, 12, 4)

        // Pernas
        des.fillStyle = '#1a0000'
        des.fillRect(this.x + 14, this.y + this.h - 16, 16, 16)
        des.fillRect(this.x + this.w - 30, this.y + this.h - 16, 16, 16)

        // Canhão (braço esquerdo - atira pra esquerda)
        des.fillStyle = '#880000'
        des.fillRect(this.x - 20, cy - 6, 22, 12)
        des.fillStyle = '#ff2200'
        des.fillRect(this.x - 22, cy - 4, 6, 8)

        // Borda
        des.strokeStyle = '#ff2200'
        des.lineWidth = 1.5
        des.strokeRect(this.x + 10, this.y + 12, this.w - 20, this.h - 18)
    }
}