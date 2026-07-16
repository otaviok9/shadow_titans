class Telas {
    constructor() {
        this.flashVermelho = 0
    }

    atualiza() {
        if (this.flashVermelho > 0) this.flashVermelho -= 0.12
    }

    ativar_flash() {
        this.flashVermelho = 1
    }

    // ─── FUNDO MENU ───────────────────────────────────────────────
    _fundo_menu() {
        let grad = des.createLinearGradient(0, 0, 0, 700)
        grad.addColorStop(0, '#06001a')
        grad.addColorStop(0.5, '#0d003a')
        grad.addColorStop(1, '#06001a')
        des.fillStyle = grad
        des.fillRect(0, 0, 1200, 700)

        // Estrelas
        let estrelas = [
            [80,60],[220,30],[400,80],[600,20],[850,65],[1050,40],[1150,85],
            [140,190],[360,140],[560,170],[760,110],[970,150],[1080,190],
            [190,340],[450,290],[700,310],[910,270],[1160,330],
            [70,490],[310,470],[510,510],[720,455],[940,490],[1100,470],
            [55,150],[185,310],[430,200],[690,430],[830,175],[975,385],[1090,255],
            [330,555],[570,615],[745,570],[895,635],[1025,545]
        ]
        estrelas.forEach(([x, y], i) => {
            let a = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 900 + i * 0.5))
            des.globalAlpha = a
            des.fillStyle = 'white'
            des.beginPath()
            des.arc(x, y, 1.5, 0, Math.PI * 2)
            des.fill()
        })
        des.globalAlpha = 1
    }

    // ─── BOTÃO ────────────────────────────────────────────────────
    _botao(texto, x, y, cor, corSombra) {
        des.fillStyle = corSombra || '#222'
        des.fillRect(x - 200, y - 30, 400, 55)
        des.fillStyle = cor
        des.fillRect(x - 200, y - 35, 400, 55)
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(x - 200, y - 35, 400, 10)
        des.fillStyle = '#000'
        des.font = '13px "Press Start 2P"'
        des.textAlign = 'center'
        des.textBaseline = 'middle'
        des.fillText(texto, x, y - 8)
        des.textBaseline = 'alphabetic'
    }

    // ─── MENU INICIAL ─────────────────────────────────────────────
    desenha_menu() {
        // Fundo = imagem principal do jogo (cobre a tela inteira, mantendo a proporção)
        let img = IMG.menu_fundo
        if (img && img.complete && img.naturalWidth > 0) {
            let escala = 700 / img.naturalHeight
            let imgW   = img.naturalWidth * escala
            des.drawImage(img, (1200 - imgW) / 2, 0, imgW, 700)
        } else {
            this._fundo_menu()
        }

        des.textAlign = 'center'

        this._botao('▶  JOGAR', 600, 285, '#5c00c7', '#2e0060')
        this._botao('⚔️  1 V 1', 600, 375, '#a30030', '#4a0016')
        this._botao('📖  MANUAL', 600, 465, '#00609c', '#003050')
        this._botao('ℹ️  SOBRE', 600, 555, '#006040', '#002a1a')

        // Detalhe leve: selinho de versão, discreto, no canto
        des.fillStyle = 'rgba(255,255,255,0.25)'
        des.font = '8px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText('Shadow Titans · v1.0', 1180, 685)

        des.textAlign = 'left'
    }

    // ─── MANUAL ───────────────────────────────────────────────────
    desenha_manual() {
        this._fundo_menu()

        des.fillStyle = '#a060ff'
        des.font = '20px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('📖 MANUAL', 600, 55)

        let linhas = [
            { t: '🎮 CONTROLES', cor: '#a060ff', sz: '13px' },
            { t: 'Mover: W / A / S / D', cor: 'white', sz: '10px' },
            { t: 'Atirar: ESPAÇO', cor: 'white', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '❤️  VIDAS', cor: '#a060ff', sz: '13px' },
            { t: 'Você começa com 5 vidas', cor: 'white', sz: '10px' },
            { t: 'Tiro do vilão = -1 vida', cor: '#ff5555', sz: '10px' },
            { t: 'Coração coletado = +1 vida', cor: '#ff6ea0', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '💀 VILÃO', cor: '#a060ff', sz: '13px' },
            { t: 'Vilão tem 10 de vida', cor: 'white', sz: '10px' },
            { t: 'Seus tiros acertam e removem vida', cor: 'white', sz: '10px' },
            { t: 'Tiros do vilão rebatam nas bordas!', cor: '#ffaa00', sz: '10px' },
            { t: '', cor: '', sz: '10px' },
            { t: '🗺️  FASES', cor: '#a060ff', sz: '13px' },
            { t: 'São 4 fases com vilões diferentes', cor: 'white', sz: '10px' },
            { t: 'Cada fase tem uma cutscene', cor: 'white', sz: '10px' },
        ]

        linhas.forEach((l, i) => {
            if (!l.t) return
            des.fillStyle = l.cor
            des.font = `${l.sz} "Press Start 2P"`
            des.fillText(l.t, 600, 100 + i * 30)
        })

        this._botao('VOLTAR', 600, 665, '#5c00c7', '#2e0060')
        des.textAlign = 'left'
    }

    // ─── SOBRE ────────────────────────────────────────────────────
    // Card de um integrante da equipe (grade 2x2 — usa posCardDev definido em index.js)
    _card_dev(i, d) {
        let c = posCardDev(i)
        let corBorda = '#a060ff'

        des.strokeStyle = corBorda
        des.lineWidth = 2
        des.strokeRect(c.x, c.y, c.w, c.h)
        des.fillStyle = 'rgba(140,80,255,0.07)'
        des.fillRect(c.x, c.y, c.w, c.h)

        // Foto (círculo) — usa a foto real se existir, senão um espaço reservado
        let raio = 46
        let ax = c.x + 70, ay = c.y + c.h / 2
        let img = d.foto ? IMG[d.foto] : null
        let temFoto = !!(img && img.complete && img.naturalWidth > 0)

        des.save()
        des.beginPath()
        des.arc(ax, ay, raio, 0, Math.PI * 2)
        des.clip()
        des.fillStyle = 'rgba(0,0,0,0.4)'
        des.fillRect(ax - raio, ay - raio, raio * 2, raio * 2)
        if (temFoto) des.drawImage(img, ax - raio, ay - raio, raio * 2, raio * 2)
        des.restore()

        des.beginPath()
        des.arc(ax, ay, raio, 0, Math.PI * 2)
        des.strokeStyle = corBorda
        des.lineWidth = 2
        des.stroke()

        if (!temFoto) {
            des.fillStyle = 'rgba(255,255,255,0.3)'
            des.font = '22px "Press Start 2P"'
            des.textAlign = 'center'
            des.fillText('?', ax, ay + 8)
        }

        // Textos
        let tx = c.x + 140
        des.textAlign = 'left'
        des.fillStyle = corBorda
        des.font = '9px "Press Start 2P"'
        let icone = /scrum/i.test(d.cargo) ? '🧭' : '👨‍💻'
        des.fillText(`${icone} ${d.cargo.toUpperCase()}`, tx, c.y + 22)

        des.fillStyle = 'white'
        des.font = '13px "Press Start 2P"'
        des.fillText(d.nome, tx, c.y + 46)

        if (d.curso) {
            des.fillStyle = 'rgba(255,255,255,0.5)'
            des.font = '8px "Press Start 2P"'
            des.fillText(d.curso, tx, c.y + 62)
        }

        if (d.instagram) {
            des.fillStyle = d.instagram.url ? 'rgba(200,140,255,0.9)' : 'rgba(200,140,255,0.4)'
            des.font = '8px "Press Start 2P"'
            des.fillText(`📸 ${d.instagram.texto}  ${d.instagram.url ? '← clique' : '(em breve)'}`, tx, c.y + 82)
        }
        if (d.github) {
            des.fillStyle = d.github.url ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)'
            des.font = '8px "Press Start 2P"'
            des.fillText(`🐙 ${d.github.texto}  ${d.github.url ? '← clique' : '(em breve)'}`, tx, c.y + 100)
        }
        if (!d.instagram && !d.github) {
            des.fillStyle = 'rgba(255,255,255,0.25)'
            des.font = '8px "Press Start 2P"'
            des.fillText('— vaga disponível —', tx, c.y + 88)
        }
    }

    desenha_sobre() {
        this._fundo_menu()

        des.fillStyle = '#a060ff'
        des.font = '20px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('ℹ️  SOBRE', 600, 40)

        // Equipe (4 vagas em grade 2x2)
        let devs = (typeof DESENVOLVEDORES !== 'undefined') ? DESENVOLVEDORES : []
        devs.slice(0, 4).forEach((d, i) => this._card_dev(i, d))

        // Card professor
        des.strokeStyle = '#00e5aa'
        des.lineWidth = 2
        des.strokeRect(30, 348, 1140, 88)
        des.fillStyle = 'rgba(0,229,170,0.05)'
        des.fillRect(30, 348, 1140, 88)
        des.fillStyle = '#00e5aa'
        des.font = '11px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillText('🎓 PROFESSOR ORIENTADOR (PRODUCT OWNER)', 600, 375)
        des.fillStyle = 'white'
        des.font = '15px "Press Start 2P"'
        des.fillText('Prof. Carlos', 600, 405)
        des.fillStyle = 'rgba(255,255,255,0.35)'
        des.font = '9px "Press Start 2P"'
        des.fillText('Programação de Aplicativos', 600, 428)

        // Tecnologias
        des.strokeStyle = '#a060ff'
        des.lineWidth = 2
        des.strokeRect(30, 452, 1140, 56)
        des.fillStyle = 'rgba(140,80,255,0.05)'
        des.fillRect(30, 452, 1140, 56)
        des.fillStyle = '#a060ff'
        des.font = '10px "Press Start 2P"'
        des.fillText('🛠️ HTML5 | Canvas API | JavaScript ES6+', 600, 476)
        des.fillStyle = 'rgba(255,255,255,0.3)'
        des.font = '9px "Press Start 2P"'
        des.fillText('© 2026 Shadow Titans - Todos os direitos reservados', 600, 498)

        this._botao('VOLTAR', 600, 645, '#5c00c7', '#2e0060')
        des.textAlign = 'left'
    }

    // ─── SELEÇÃO 1 V 1 ──────────────────────────────────────────────
    // colX: centro X da coluna | lista: array de nomes (4 itens, grade 2x2) | selecionado: nome escolhido
    _grade_selecao(colX, lista, selecionado, corTema) {
        let itemW = 220, itemH = 240, gap = 20
        let gridW = itemW * 2 + gap
        let startX = colX - gridW / 2
        let startY = 110
        let fotoMargem = 14
        let fotoTam = itemW - fotoMargem * 2 // quadrado grande da foto

        lista.forEach((nome, i) => {
            let col = i % 2
            let row = Math.floor(i / 2)
            let boxX = startX + col * (itemW + gap)
            let boxY = startY + row * (itemH + gap)
            let ativo = nome === selecionado

            des.fillStyle = ativo ? corTema : 'rgba(255,255,255,0.06)'
            des.fillRect(boxX, boxY, itemW, itemH)
            des.strokeStyle = ativo ? 'white' : corTema
            des.lineWidth = ativo ? 4 : 2
            des.strokeRect(boxX, boxY, itemW, itemH)

            // ─ Foto do personagem (ou placeholder cinza se ainda não existir) ─
            let fotoX = boxX + fotoMargem, fotoY = boxY + fotoMargem
            let img = typeof IMG_PERSONAGENS !== 'undefined' ? IMG_PERSONAGENS[nome] : null

            if (img && img.complete && img.naturalWidth > 0) {
                des.drawImage(img, fotoX, fotoY, fotoTam, fotoTam)
                des.strokeStyle = 'rgba(255,255,255,0.5)'
                des.lineWidth = 1.5
                des.strokeRect(fotoX, fotoY, fotoTam, fotoTam)
            } else {
                des.fillStyle = 'rgba(255,255,255,0.15)'
                des.fillRect(fotoX, fotoY, fotoTam, fotoTam)
                des.strokeStyle = 'rgba(255,255,255,0.5)'
                des.lineWidth = 1.5
                des.strokeRect(fotoX, fotoY, fotoTam, fotoTam)
                des.fillStyle = 'rgba(255,255,255,0.35)'
                des.font = '11px "Press Start 2P"'
                des.textAlign = 'center'
                des.textBaseline = 'middle'
                des.fillText('foto', fotoX + fotoTam / 2, fotoY + fotoTam / 2)
            }

            // Nome do personagem (faixa inferior do card)
            des.fillStyle = ativo ? '#fff' : 'rgba(255,255,255,0.9)'
            des.font = '9px "Press Start 2P"'
            des.textAlign = 'center'
            des.textBaseline = 'middle'
            des.fillText(nome, boxX + itemW / 2, fotoY + fotoTam + (itemH - fotoMargem - fotoTam) / 2)
        })
        des.textAlign = 'left'
        des.textBaseline = 'alphabetic'
    }

    desenha_selecao_1v1(listaViloes, listaHerois, selVilao, selHeroi) {
        this._fundo_menu()

        des.font = 'bold 22px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#4a0010'
        des.fillText('⚔️ SELEÇÃO 1 V 1', 603, 33)
        des.fillStyle = '#ff5577'
        des.fillText('⚔️ SELEÇÃO 1 V 1', 600, 30)

        // Cabeçalhos das colunas (heróis à esquerda, vilões à direita)
        des.font = '12px "Press Start 2P"'
        des.fillStyle = '#66aaff'
        des.fillText('JOGADOR 1 — HERÓI', 300, 72)
        des.fillStyle = '#ffaa66'
        des.fillText('JOGADOR 2 — VILÃO', 900, 72)

        // Dica de controles de cada jogador (apenas cima/baixo)
        des.font = '9px "Press Start 2P"'
        des.fillStyle = '#aaccff'
        des.fillText('W / S move · ESPAÇO atira', 300, 90)
        des.fillStyle = '#ffccaa'
        des.fillText('↑ / ↓ move · P atira', 900, 90)

        this._grade_selecao(300, listaHerois, selHeroi, '#0050a0')
        this._grade_selecao(900, listaViloes, selVilao, '#a30030')

        // Botão VOLTAR
        this._botao('VOLTAR', 300, 665, '#444', '#222')

        // Botão COMEÇAR (esmaecido até ambos escolherem)
        let prontos = selVilao && selHeroi
        this._botao('COMEÇAR', 900, 665, prontos ? '#1e5200' : '#333', prontos ? '#0e2800' : '#1a1a1a')

        des.textAlign = 'left'
    }

    // ─── FINAL 1 V 1 ────────────────────────────────────────────────
    desenha_final_1v1(venceu, nomeHeroi, nomeVilao) {
        this._fundo_menu()

        des.fillStyle = venceu ? 'rgba(140,80,255,0.08)' : 'rgba(150,0,0,0.08)'
        des.beginPath()
        des.arc(600, 220, 220, 0, Math.PI * 2)
        des.fill()

        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 600))
        des.font = '38px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = venceu ? '#3a0080' : '#4a0000'
        des.fillText(venceu ? '🏆 VITÓRIA!' : 'GAME OVER', 603, 223)
        des.fillStyle = venceu ? `rgba(160,100,255,${a})` : `rgba(255,50,50,${a})`
        des.fillText(venceu ? '🏆 VITÓRIA!' : 'GAME OVER', 600, 220)

        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '11px "Press Start 2P"'
        des.fillText(
            venceu ? `${nomeHeroi} derrotou ${nomeVilao}!` : `${nomeVilao} derrotou ${nomeHeroi}!`,
            600, 300
        )

        this._botao('JOGAR NOVAMENTE', 600, 430, '#5c00c7', '#2e0060')
        this._botao('MENU', 600, 520, '#006040', '#002a1a')

        des.textAlign = 'left'
    }

    // ─── HUD ──────────────────────────────────────────────────────
    desenha_hud(heroi, vilao, fase, nomeHeroi, nomeVilao) {
        // Barra superior semitransparente
        des.fillStyle = 'rgba(0,0,0,0.55)'
        des.fillRect(0, 0, 1200, 60)

        // == BARRA DE VIDA HERÓI ==
        des.fillStyle = '#a060ff'
        des.font = '10px "Press Start 2P"'
        des.textAlign = 'left'
        des.fillText(nomeHeroi ? nomeHeroi.toUpperCase() : 'HERÓI', 15, 18)

        let largBarra = 220
        let barraX = 15
        let barraY = 24
        // fundo cinza
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(barraX, barraY, largBarra, 16)
        // vida atual
        let pctH = heroi.vida / heroi.vidaMax
        des.fillStyle = pctH > 0.5 ? '#4cff82' : pctH > 0.25 ? '#ffdd00' : '#ff3333'
        des.fillRect(barraX, barraY, largBarra * pctH, 16)
        // borda
        des.strokeStyle = '#a060ff'
        des.lineWidth = 1.5
        des.strokeRect(barraX, barraY, largBarra, 16)
        // texto vida
        des.fillStyle = 'white'
        des.font = '9px "Press Start 2P"'
        des.fillText(`${heroi.vida} / ${heroi.vidaMax}`, barraX + 80, barraY + 12)

        // == FASE CENTRO ==
        des.font = '14px "Press Start 2P"'
        des.textAlign = 'center'
        if (!nomeHeroi && fase === 4) {
            // Chefão final (Zul'Kahr) — destaque no centro do HUD
            let p = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 300))
            let emFuria = vilao.vida <= vilao.vidaMax / 2
            let texto
            if (vilao.transformado) {
                des.fillStyle = `rgba(255,60,255,${p})` // 2ª forma: destaque roxo/rosa (combina com a aura nova)
                texto = emFuria ? '☠ FÚRIA SOMBRIA! ☠' : '☠ FORMA SOMBRIA ☠'
            } else {
                des.fillStyle = `rgba(255,70,70,${p})`
                texto = emFuria ? '☠ FÚRIA FINAL! ☠' : '⚠ CHEFÃO FINAL ⚠'
            }
            des.fillText(texto, 600, 38)
        } else {
            des.fillStyle = 'white'
            des.fillText(nomeHeroi ? '1 V 1' : 'FASE ' + fase, 600, 38)
        }

        // == BARRA DE VIDA VILÃO ==
        des.fillStyle = '#ff4444'
        des.font = '10px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText(nomeVilao ? nomeVilao.toUpperCase() : 'VILÃO', 1185, 18)

        let barraVX = 1185 - largBarra
        // fundo
        des.fillStyle = 'rgba(255,255,255,0.15)'
        des.fillRect(barraVX, barraY, largBarra, 16)
        // vida vilão
        let pctV = vilao.vida / vilao.vidaMax
        des.fillStyle = pctV > 0.5 ? '#ff4444' : pctV > 0.25 ? '#ff8800' : '#ffee00'
        des.fillRect(barraVX, barraY, largBarra * pctV, 16)
        // borda
        des.strokeStyle = '#ff4444'
        des.lineWidth = 1.5
        des.strokeRect(barraVX, barraY, largBarra, 16)
        // texto vida vilão
        des.fillStyle = 'white'
        des.font = '9px "Press Start 2P"'
        des.textAlign = 'right'
        des.fillText(`${vilao.vida} / ${vilao.vidaMax}`, barraVX + largBarra - 8, barraY + 12)

        des.textAlign = 'left'
    }

    // ─── FLASH ────────────────────────────────────────────────────
    desenha_flash() {
        if (this.flashVermelho > 0) {
            des.fillStyle = `rgba(229,57,53,${this.flashVermelho * 0.35})`
            des.fillRect(0, 0, 1200, 700)
        }
    }

    // ─── VITÓRIA ──────────────────────────────────────────────────
    desenha_vitoria() {
        this._fundo_menu()

        des.fillStyle = 'rgba(140,80,255,0.08)'
        des.beginPath()
        des.arc(600, 220, 220, 0, Math.PI * 2)
        des.fill()

        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 600))
        des.font = '42px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#3a0080'
        des.fillText('🏆 VITÓRIA!', 603, 223)
        des.fillStyle = `rgba(160,100,255,${a})`
        des.fillText('🏆 VITÓRIA!', 600, 220)

        des.fillStyle = 'rgba(255,255,255,0.7)'
        des.font = '10px "Press Start 2P"'
        des.fillText('Os Titãs salvaram a Torre!', 600, 300)
        des.fillText('Zul\'Kahr foi derrotado!', 600, 330)

        this._botao('JOGAR NOVAMENTE', 600, 430, '#5c00c7', '#2e0060')
        this._botao('MENU', 600, 520, '#006040', '#002a1a')

        des.textAlign = 'left'
    }

    // ─── DERROTA ──────────────────────────────────────────────────
    desenha_derrota(fase) {
        this._fundo_menu()

        des.fillStyle = 'rgba(150,0,0,0.08)'
        des.beginPath()
        des.arc(600, 220, 220, 0, Math.PI * 2)
        des.fill()

        let a = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 600))
        des.font = '42px "Press Start 2P"'
        des.textAlign = 'center'
        des.fillStyle = '#4a0000'
        des.fillText('GAME OVER', 603, 223)
        des.fillStyle = `rgba(255,50,50,${a})`
        des.fillText('GAME OVER', 600, 220)

        des.fillStyle = 'rgba(255,255,255,0.6)'
        des.font = '10px "Press Start 2P"'
        des.fillText('Os Titãs foram derrotados...', 600, 295)
        des.fillStyle = 'rgba(255,200,100,0.8)'
        des.font = '11px "Press Start 2P"'
        des.fillText('Você chegou até a Fase ' + fase, 600, 340)

        this._botao('TENTAR NOVAMENTE', 600, 440, '#8b0000', '#4a0000')
        this._botao('MENU', 600, 530, '#5c00c7', '#2e0060')

        des.textAlign = 'left'
    }
}