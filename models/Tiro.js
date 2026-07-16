class Tiro extends Obj {
    constructor(x, y, velX, velY, dono) {
        // dono: 'heroi' ou 'vilao'
        super(x, y, 14, 6, null)
        this.velX = velX
        this.velY = velY
        this.dono = dono
        this.ativo = true
    }

    mov() {
        this.x += this.velX
        this.y += this.velY

        if (this.dono === 'heroi' && this.x > 1210) {
            this.ativo = false
            return
        }

        if (this.dono === 'vilao') {
            if (this.y <= 0) {
                this.y = 0
                this.velY *= -1
            }
            if (this.y >= 700 - this.h) {
                this.y = 700 - this.h
                this.velY *= -1
            }
            if (this.x < -20) {
                this.ativo = false
            }
            if (this.x > 1210) {
                this.ativo = false
            }
        }
    }

    des_tiro() {
        if (!this.ativo) return


        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        if (this.dono === 'heroi') { 
            des.fillStyle = '#ffffff'
            des.fillRect(this.x + 4, this.y + 1, 6, 4)


            // <── escolhe o sprite do tiro conforme a fase (só no modo história;
            //     no modo 1 V 1 não há sprite de tiro por personagem ainda, então
            //     usa sempre o tiro neutro abaixo, sem herdar a fase da campanha)
            let quadro = null
            if (!modo1v1) {
                if (fase === 1) {
                    quadro = Math.floor(Date.now() / 90) % 2 === 0 ? IMG.tiro_heroi1 : IMG.tiro_heroi2
                } else if (fase === 2) {
                    quadro = IMG.tiro_davi1
                } else if (fase === 3) {
                    quadro = IMG.tiro_pedrion1
                } else if (fase === 4) {
                    quadro = IMG.tiro_mutavio1
                }
            }

            if (quadro && quadro.complete && quadro.naturalWidth > 0) {
                let sw = 40, sh = 26
                des.drawImage(quadro, cx - sw / 2, cy - sh / 2, sw, sh)
            } else {
                // Fallback (sprite ainda não carregado): desenho original
                des.fillStyle = '#ffffff'
                des.fillRect(this.x + 4, this.y + 1, 6, 4)
                des.fillStyle = '#00eeff'
                des.fillRect(this.x, this.y, this.w, this.h)
                des.fillStyle = 'rgba(0, 238, 255, 0.4)'
                des.fillRect(this.x - 8, this.y + 1, 10, 4)
                des.fillStyle = 'rgba(255,255,255,0.6)'
                des.fillRect(this.x + this.w - 4, this.y + 1, 4, 4)
            }

        } else {
            let cx = this.x + this.w / 2
            let cy = this.y + this.h / 2


            // <── escolhe o sprite do tiro do vilão conforme a fase (só no modo história;
            //     no modo 1 V 1 não há sprite de tiro por personagem ainda, então
            //     usa sempre o tiro neutro abaixo, sem herdar a fase da campanha)
            let quadro = null
            if (!modo1v1) {
                if (fase === 1) {
                    quadro = IMG.tiro_vilao_fase1
                } else if (fase === 2) {
                    quadro = IMG.tiro_vilao_fase2
                } else if (fase === 3) {
                    quadro = IMG.tiro_vilao_fase3
                } else if (fase === 4) {
                    quadro = IMG.tiro_vilao_fase4
                }
            }
            if (quadro && quadro.complete && quadro.naturalWidth > 0) {
                let sw = 40, sh = 26
                des.drawImage(quadro, cx - sw / 2, cy - sh / 2, sw, sh)
            } else {
                // Fallback (sprite ainda não carregado): desenho original
                des.fillStyle = 'rgba(255, 50, 0, 0.35)'
                des.fillRect(this.x + this.w - 2, this.y + 1, 10, 4)
                des.fillStyle = '#ff2200'
                des.fillRect(this.x, this.y, this.w, this.h)
                des.fillStyle = '#ffaa00'
                des.fillRect(this.x + 2, this.y + 1, 6, 4)
                des.fillStyle = '#ffffff'
                des.fillRect(this.x, this.y + 2, 3, 2)
            }
        }
    }
}