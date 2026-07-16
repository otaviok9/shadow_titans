class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a 
    }

    des_imagem() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    des_quad(cor) {
        des.fillStyle = cor || this.a
        des.fillRect(this.x, this.y, this.w, this.h)
    }

    colid(outro) {
        return (
            this.x < outro.x + outro.w &&
            this.x + this.w > outro.x &&
            this.y < outro.y + outro.h &&
            this.y + this.h > outro.y
        )
    }
}