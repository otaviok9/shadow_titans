class Heroi extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.vida = 5
        this.vidaMax = 5
        this.dirX = 0
        this.dirY = 0
        this.vel = 5
        this.cooldownTiro = 0
        this.animFrame = 0
        this.animTimer = 0
        this.olhandoEsquerda = false
        this.timerSpriteAtirando = 0 // <── frames restantes mostrando o sprite "atirando" (modo 1 V 1)
    }

    mov() {
        this.x += this.dirX * this.vel
        this.y += this.dirY * this.vel

        if (this.x < 0) this.x = 0
        if (this.x > 1200 - this.w) this.x = 1200 - this.w
        if (this.y < 0) this.y = 0
        if (this.y > 700 - this.h) this.y = 700 - this.h

        if (this.cooldownTiro > 0) this.cooldownTiro--

        if (this.dirX !== 0) this.olhandoEsquerda = this.dirX < 0

        this.animTimer++
        if (this.animTimer >= 8) {
            this.animTimer = 0
            this.animFrame++
        }

        if (this.timerSpriteAtirando > 0) this.timerSpriteAtirando--
    }

    // Desenha o herói usando os sprites do personagem da fase atual
    des_heroi() {
        // <── MODO 1 V 1: usa os sprites do personagem escolhido na seleção, sem
        //     mexer no desenho por fase usado no modo história (abaixo)
        if (typeof modo1v1 !== 'undefined' && modo1v1 && typeof sel1v1 !== 'undefined' && sel1v1.heroi) {
            let sprites = SPRITES_1V1[sel1v1.heroi]
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

        // <── conjuntos de sprites por fase: Fase 1 = Kreftalad, Fase 2 = Daviborg, Fase 3 = Pedrion, Fase 4 = Mutávio
        let configs = {
            1: {
                parado:   ['heroi_parado1', 'heroi_parado2', 'heroi_parado3'],
                correndo: ['heroi_correndo1', 'heroi_correndo3', 'heroi_correndo4'],
                atirando: 'heroi_atirando'
            },
            2: {
                parado:   ['davi_parado1', 'davi_parado2', 'davi_parado3'],
                correndo: ['davi_correndo1', 'davi_correndo4'],
                atirando: 'davi_atirando'
            },
            3: {
                parado:   ['pedrion_parado1', 'pedrion_parado2', 'pedrion_parado3'],
                correndo: ['pedrion_correndo1', 'pedrion_correndo2'],
                atirando: 'pedrion_atirando'
            },
            4: {
                parado:   ['mutavio_parado1', 'mutavio_parado2', 'mutavio_parado3'],
                correndo: ['mutavio_correndo1', 'mutavio_correndo2'],
                atirando: 'mutavio_atirando'
            }
        }

        let cfg = configs[fase] // <── usa a variável global "fase" (definida no index.js) pra escolher o conjunto certo

        if (cfg) {
            let atirando = this.cooldownTiro > 10
            let movendo  = this.dirX !== 0 || this.dirY !== 0

            let quadros, indice
            if (atirando) {
                quadros = [cfg.atirando]
                indice  = 0
            } else if (movendo) {
                quadros = cfg.correndo
                indice  = this.animFrame % quadros.length
            } else {
                quadros = cfg.parado
                indice  = Math.floor(this.animFrame / 2) % quadros.length
            }

            // tenta o quadro atual; se não estiver carregado, tenta os outros do mesmo grupo
            let img = null
            for (let i = 0; i < quadros.length; i++) {
                let tentativa = IMG[quadros[(indice + i) % quadros.length]]
                if (tentativa && tentativa.complete && tentativa.naturalWidth > 0) {
                    img = tentativa
                    break
                }
            }

            if (img) {
                // <── aumenta o sprite desenhado (sem alterar a hitbox de colisão/movimento)
                //     para ficar com tamanho próximo ao do vilão
                let ESCALA = 1.4
                let sw = this.w * ESCALA, sh = this.h * ESCALA
                let cx0 = this.x + this.w / 2, cy0 = this.y + this.h / 2
                let dx = cx0 - sw / 2, dy = cy0 - sh / 2

                des.save()
                if (this.olhandoEsquerda) {
                    des.translate(dx + sw, dy)
                    des.scale(-1, 1)
                    des.drawImage(img, 0, 0, sw, sh)
                } else {
                    des.drawImage(img, dx, dy, sw, sh)
                }
                des.restore()
                return
            }
        }

        // Fallback (sem sprite configurado, ou sprite ainda não carregado): desenho original
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        des.fillStyle = '#1a3a6e'
        des.fillRect(this.x + 8, this.y + 10, this.w - 16, this.h - 15)
        des.fillStyle = '#2255aa'
        des.fillRect(this.x, this.y + 15, 12, 30)
        des.fillRect(this.x + this.w - 12, this.y + 15, 12, 30)
        des.fillStyle = '#0d2a55'
        des.fillRect(this.x + 12, this.y, this.w - 24, 22)
        des.fillStyle = '#00eeff'
        des.fillRect(this.x + 18, this.y + 5, this.w - 36, 12)
        des.fillStyle = 'rgba(255,255,255,0.4)'
        des.fillRect(this.x + 20, this.y + 6, 8, 4)
        des.fillStyle = '#00eeff'
        des.fillRect(cx - 8, cy - 5, 16, 3)
        des.fillRect(cx - 4, cy, 8, 3)
        des.fillStyle = '#0d2a55'
        des.fillRect(this.x + 12, this.y + this.h - 15, 14, 15)
        des.fillRect(this.x + this.w - 26, this.y + this.h - 15, 14, 15)
        des.fillStyle = '#4fc3f7'
        des.fillRect(this.x + this.w - 5, cy - 5, 18, 10)
        des.fillStyle = '#00eeff'
        des.fillRect(this.x + this.w + 10, cy - 3, 8, 6)
        des.strokeStyle = '#4fc3f7'
        des.lineWidth = 1.5
        des.strokeRect(this.x + 8, this.y + 10, this.w - 16, this.h - 15)
    }
}