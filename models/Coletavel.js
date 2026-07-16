class Coletavel extends Obj {
    constructor(x, y) {
        super(x, y, 28, 28, null)
        this.ativo = true
        this.velY = 1.5
        this.pulso = 0
    }

    mov() {
        // Desce pela tela
        this.y += this.velY
        this.pulso += 0.1

        // Sai pela parte de baixo
        if (this.y > 720) {
            this.ativo = false
        }
    }

    // Desenha coração pixel art
    des_coracao() {
        if (!this.ativo) return

        let escala = 1 + 0.08 * Math.sin(this.pulso)
        let cx = this.x + this.w / 2
        let cy = this.y + this.h / 2

        des.save()
        des.translate(cx, cy)
        des.scale(escala, escala)
        des.translate(-cx, -cy)

        // Sombra suave
        des.fillStyle = 'rgba(255, 0, 80, 0.2)'
        des.fillRect(this.x - 2, this.y + 4, this.w + 4, this.h + 4)

        
        let px = 4 
        let ox = this.x  
        let oy = this.y  

        // Mapa do coração (1 = pixel preenchido)
        let mapa = [
            [0,1,1,0,1,1,0],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [0,1,1,1,1,1,0],
            [0,0,1,1,1,0,0],
            [0,0,0,1,0,0,0],
        ]

        // Cor principal
        des.fillStyle = '#ff1a5e'
        mapa.forEach((linha, row) => {
            linha.forEach((cel, col) => {
                if (cel) des.fillRect(ox + col * px, oy + row * px, px, px)
            })
        })

        // Brilho (canto superior esquerdo)
        des.fillStyle = '#ff8ab0'
        des.fillRect(ox + px, oy, px, px)
        des.fillRect(ox, oy + px, px, px)

        // Highlight
        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.fillRect(ox + px, oy + px, px, px)

        des.restore()
    }
}