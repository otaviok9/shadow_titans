let des = document.getElementById('des').getContext('2d')

let tela = 'menu'
let fase = 1
 
let IMG = {}
;[
    ['torre',   'img/cenario1_torre.png'],   
    ['menu_fundo', 'img/imagem_de_fundo_do_jogo.png'],
    ['cidade',  'img/cenario2_cidade.png'],  
    ['praia',   'img/cenario3_praia.png'],   
    ['vitoria', 'img/cenario3_vitoria.png'], 
    ['lab',          'img/cenario4_lab.png'],        
    ['lab_vitoria',  'img/cenario4_lab_vitoria.png'],  
    ['cobertura',         'img/cenario5_cobertura.png'],        
    ['cobertura_vitoria', 'img/cenario5_cobertura_vitoria.png'], 
    ['lutaFinal',         'img/cenario7_lutaFinal.png'],        
    ['lutaFinal_vitoria', 'img/cenario7_lutaFinal_vitoria.png'],
    ['heroi_parado1',   'img/krefta_parado_01.png'],   
    ['heroi_parado2',   'img/krefta_parado_02.png'],   
    ['heroi_parado3',   'img/krefta_parado_03.png'],   
    ['heroi_correndo1', 'img/krefta_correndo_01.png'], 
    ['heroi_correndo3', 'img/krefta_correndo_02.png'], 
    ['heroi_correndo4', 'img/krefta_correndo_03.png'], 
    ['heroi_atirando',  'img/krefta_atirando_02.png'], 
    ['tiro_heroi1',     'img/krefta_tiro_02.png'],     
    ['tiro_heroi2',     'img/krefta_tiro_03.png'],    
    ['davi_parado1',    'img/davi_parado_01.png'],     
    ['davi_parado2',    'img/davi_parado_02.png'],     
    ['davi_parado3',    'img/davi_parado_03.png'],     
    ['davi_correndo1',  'img/davi_correndo_01.png'],   
    ['davi_correndo4',  'img/davi_correndo_02.png'],   
    ['davi_atirando',   'img/davi_atirando_01.png'],  
    ['tiro_davi1',      'img/tiro_davi_01.png'],
    ['pedrion_parado1',   'img/theis_parado_01.png'],   
    ['pedrion_parado2',   'img/theis_parado_02.png'],   
    ['pedrion_parado3',   'img/theis_parado_03.png'],   
    ['pedrion_correndo1', 'img/theis_correndo_01.png'], 
    ['pedrion_correndo2', 'img/theis_correndo_02.png'], 
    ['pedrion_atirando',  'img/theis_atirando_01.png'], 
    ['tiro_pedrion1',     'img/theis_tiro_01.png'], 
    ['mutavio_parado1',   'img/paulo_parado_01.png'],   
    ['mutavio_parado2',   'img/paulo_parado_02.png'],   
    ['mutavio_parado3',   'img/paulo_parado_03.png'],   
    ['mutavio_correndo1', 'img/paulo_correndo_01.png'], 
    ['mutavio_correndo2', 'img/paulo_correndo_02.png'], 
    ['mutavio_atirando',  'img/paulo_atirando_01.png'], 
    ['tiro_mutavio1',     'img/paulo_tiro_01.png'], 

    // ── Vilão Fase 1: Doutor Solaris ──
    ['vilao_fase1_parado1',  'img/doutor_luz_parado_01.png'],
    ['vilao_fase1_parado2',  'img/doutor_luz_parado_02.png'],
    ['vilao_fase1_parado3',  'img/doutor_luz_parado_03.png'],
    ['vilao_fase1_atirando', 'img/doutor_luz_atirando_01.png'],
    ['tiro_vilao_fase1',     'img/doutor_luz_tiro01.png'],

    // ── Vilão Fase 2: Senhor X ──
    ['vilao_fase2_parado1',  'img/senhorX_parado_01.png'],
    ['vilao_fase2_parado2',  'img/senhorX_parado_02.png'],
    ['vilao_fase2_parado3',  'img/senhorX_parado_03.png'],
    ['vilao_fase2_atirando', 'img/senhorX_atirando_01.png'],
    ['tiro_vilao_fase2',     'img/senhorX_tiro01.png'],

    // ── Vilão Fase 3: General Shade ──
    ['vilao_fase3_parado1',  'img/shade_parado_01.png'],
    ['vilao_fase3_parado2',  'img/shade_parado_02.png'],
    ['vilao_fase3_parado3',  'img/shade_parado_03.png'],
    ['vilao_fase3_atirando', 'img/shade_atirando01.png'],
    ['tiro_vilao_fase3',     'img/shade_tiro01.png'],

    // ── Vilão Fase 4: Zul'Kahr ──
    ['vilao_fase4_parado1',  'img/zul_parado_01.png'],
    ['vilao_fase4_parado2',  'img/zul_parado_02.png'],
    ['vilao_fase4_parado3',  'img/zul_parado_03.png'],
    ['vilao_fase4_atirando', 'img/zulkar_atirando_01.png'],
    ['tiro_vilao_fase4',     'img/zul_tiro01.png'],

    // ── Foto da equipe (tela SOBRE) ──
    ['foto_paulo', 'img/foto_paulo.png'],

].forEach(([k, src]) => {
    IMG[k] = new Image()
    IMG[k].src = src
})
 
// ═══════════════════════════════════════════════════════════════
//  OBJETOS
// ═══════════════════════════════════════════════════════════════
let heroi = new Heroi(100, 300, 60, 70, null)
let vilao = new Vilao(1050, 280, 80, 90, null)
let telas = new Telas()
let cena  = new Cutscene()
 
let tirosHeroi   = []
let tirosVilao   = []
let coletaveis   = []
let timerCoracao = 0
const INTERVALO_CORACAO = 480

// ═══════════════════════════════════════════════════════════════
//  MODO 1 V 1
// ═══════════════════════════════════════════════════════════════
const VILOES_1V1 = ['Doutor Solaris', 'Senhor X', 'General Shade', 'Zul\'Kahr']
const HEROIS_1V1 = ['Pedrion', 'Daviborg', 'Kreftalad', 'Mutávio']

let modo1v1  = false
let sel1v1   = { vilao: null, heroi: null }

// Fotos dos personagens do 1 V 1
let IMG_PERSONAGENS = {}
;[
    ['Pedrion',        'img/pedrion.png'],
    ['Daviborg',       'img/daviborg.png'],
    ['Kreftalad',      'img/kreftalad.png'],
    ['Mutávio',        'img/mutavio.png'],
    ['Doutor Solaris', 'img/doutor_solaris.png'],
    ['Senhor X',       'img/senhor_x.png'],
    ['General Shade',  'img/general_shade.png'],
    ['Zul\'Kahr',      'img/zulkahr.png'],
].forEach(([nome, src]) => {
    IMG_PERSONAGENS[nome] = new Image()
    IMG_PERSONAGENS[nome].src = src
})

// ─────────────────────────────────────────────────────────────
// Sprites de LUTA do 1 V 1 (parado x2 + atirando x1) por personagem
// Reaproveita as imagens já carregadas em IMG (mesmas usadas no modo
// história), já que não existem arquivos "*_parado1.png" separados.
// ─────────────────────────────────────────────────────────────
const CHAVES_1V1 = {
    'Pedrion':        { parado1: 'pedrion_parado1',    parado2: 'pedrion_parado2',    atirando: 'pedrion_atirando' },
    'Daviborg':       { parado1: 'davi_parado1',       parado2: 'davi_parado2',       atirando: 'davi_atirando' },
    'Kreftalad':      { parado1: 'heroi_parado1',      parado2: 'heroi_parado2',      atirando: 'heroi_atirando' },
    'Mutávio':        { parado1: 'mutavio_parado1',    parado2: 'mutavio_parado2',    atirando: 'mutavio_atirando' },
    'Doutor Solaris': { parado1: 'vilao_fase1_parado1', parado2: 'vilao_fase1_parado2', atirando: 'vilao_fase1_atirando' },
    'Senhor X':       { parado1: 'vilao_fase2_parado1', parado2: 'vilao_fase2_parado2', atirando: 'vilao_fase2_atirando' },
    'General Shade':  { parado1: 'vilao_fase3_parado1', parado2: 'vilao_fase3_parado2', atirando: 'vilao_fase3_atirando' },
    'Zul\'Kahr':      { parado1: 'vilao_fase4_parado1', parado2: 'vilao_fase4_parado2', atirando: 'vilao_fase4_atirando' },
}

let SPRITES_1V1 = {}
Object.entries(CHAVES_1V1).forEach(([nome, chaves]) => {
    SPRITES_1V1[nome] = {
        parado1:  IMG[chaves.parado1],
        parado2:  IMG[chaves.parado2],
        atirando: IMG[chaves.atirando],
    }
})

// ═══════════════════════════════════════════════════════════════
//  EQUIPE (tela SOBRE) — 4 vagas: Paulo Otávio + 3 a definir
// ═══════════════════════════════════════════════════════════════
const DESENVOLVEDORES = [
    {
        nome:      'Paulo Otávio',
        cargo:     'Desenvolvedor',
        curso:     'Técnico em Desenvolvimento de Sistemas',
        foto:      'foto_paulo',
        instagram: { texto: '@__paulo.otv', url: 'https://www.instagram.com/__paulo.otv' },
        github:    { texto: 'otaviok9',     url: 'https://github.com/otaviok9' },
    },
    {
        nome:      'Pedro Augusto',
        cargo:     'Scrum Master',
        curso:     'Técnico em Desenvolvimento de Sistemas',
        foto:      null,
        instagram: { texto: '@instagram', url: null },
        github:    { texto: 'GitHub',     url: null },
    },
    {
        nome:      'Davi Hames',
        cargo:     'Desenvolvedor',
        curso:     'Técnico em Desenvolvimento de Sistemas',
        foto:      null,
        instagram: { texto: '@instagram', url: null },
        github:    { texto: 'GitHub',     url: null },
    },
    {
        nome:      'Pedro Krefta',
        cargo:     'Desenvolvedor',
        curso:     'Técnico em Desenvolvimento de Sistemas',
        foto:      null,
        instagram: { texto: '@instagram', url: null },
        github:    { texto: 'GitHub',     url: null },
    },
]

// Posição/tamanho do card do integrante i (0 a 3) na tela SOBRE — grade 2x2
function posCardDev(i) {
    let cardW = 560, cardH = 128, gapX = 20, gapY = 14
    let startX = 30, startY = 62
    let col = i % 2
    let row = Math.floor(i / 2)
    return {
        x: startX + col * (cardW + gapX),
        y: startY + row * (cardH + gapY),
        w: cardW,
        h: cardH,
    }
}

// Contador de quadros global, usado só pra alternar o sprite "parado" (anda 1 - 2) no 1 V 1
let frameSprite1v1 = 0

// Retorna true se a imagem já carregou de verdade (arquivo existe e não deu erro)
function sprite_ok(img) {
    return !!(img && img.complete && img.naturalWidth > 0)
}

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 1
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE1 = [
    // ── CENA 1: Torre Amanhecer ─────────────────────────────
    {
        personagem: 'Narrador',
        fala: 'Uma manhã calma na Torre dos Titãs. Ravena e Estelar saíram cedo para investigar uma anomalia energética. Pedrion, Daviborg, Kreftalad e Mutávio estão na sala principal.',
        cor: '#c8b8ff',
        fundo: 'torre'
    },
    {
        personagem: 'Pedrion',
        fala: 'A cidade está quieta demais... Alerta! Múltiplos picos de energia no centro! Alguém está tentando sobrecarregar a rede elétrica.',
        cor: '#4fc3f7',
        fundo: 'torre'      // ainda na torre
    },
 
    // ── CENA 2: Cidade (fundo muda aqui) ────────────────────
    {
        personagem: 'Daviborg',
        fala: 'É o Doutor Solaris. Consigo rastrear a assinatura dele. Ele quer apagar a cidade!',
        cor: '#81c784',
        fundo: 'cidade'     // TROCA para cidade nesta fala
    },
    {
        personagem: 'Pedrion',
        fala: 'Kreftalad, você vai na frente e cuida do Doutor Solaris na costa antes que ele desative os geradores! Daviborg, fique aqui e reforce a segurança dos computadores, sinto que isso pode ser uma armadilha.',
        cor: '#4fc3f7',
        fundo: 'cidade'
    },
    {
        personagem: 'Pedrion',
        fala: 'Mutávio, patrulhe os níveis inferiores da Torre. Eu vou dar cobertura tática. Titãs, ATACAR!',
        cor: '#4fc3f7',
        fundo: 'cidade'
    },
    {
        personagem: 'Kreftalad',
        fala: 'O Pedrion me mandou para apagar o seu brilho, Doutor Solaris! Daqui você não passa!',
        cor: '#00eeff',
        fundo: 'cidade'
    },
]
 
// ─── Fala pós-luta (vilão derrotado) ─────────────────────────
const FALAS_POS_LUTA = [
    {
        personagem: 'Doutor Solaris',
        fala: 'Heh... o plano nunca foi a cidade. O plano sempre foi... a Torre!',
        cor: '#ffaa00',
        fundo: 'vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 2: Invasão no Salão Principal
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE2 = [
    {
        personagem: 'Narrador',
        fala: 'Na sala de comando, os alarmes de invasão disparam. O misterioso Senhor X surge quebrando as janelas e hackeando o sistema central.',
        cor: '#c8b8ff',
        fundo: 'lab'
    },
    {
        personagem: 'Daviborg',
        fala: 'O Pedrion estava certo, era uma armadilha! Senhor X, saia de perto dos meus computadores! Hoje você não rouba nenhuma tecnologia nossa!',
        cor: '#81c784',
        fundo: 'lab'
    },
    {
        personagem: 'Senhor X',
        fala: 'Tarde demais, latinha. Vim pegar o que é meu e abrir caminho para o verdadeiro mestre.',
        cor: '#ff5555',
        fundo: 'lab'
    },
]

// ─── Fala pós-luta Fase 2 (Senhor X encurralado) ──────────────
const FALAS_POS_LUTA_FASE2 = [
    {
        personagem: 'Senhor X',
        fala: 'Você defendeu seus computadores, Daviborg... mas o General Shade já subiu atrás do seu líder!',
        cor: '#ffaa00',
        fundo: 'lab_vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 3: O Acerto de Contas
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE3 = [
    {
        personagem: 'Narrador',
        fala: 'Sabendo do perigo, Pedrion corre em direção ao elevador do telhado para interceptar a ameaça principal, mas as portas se abrem e seu pior inimigo surge das sombras.',
        cor: '#c8b8ff',
        fundo: 'cobertura'
    },
    {
        personagem: 'General Shade',
        fala: 'Olá, Pedrion. Mandou seus amigos para longe para me enfrentar? Você sempre foi previsível.',
        cor: '#ff5555',
        fundo: 'cobertura'
    },
    {
        personagem: 'Pedrion',
        fala: 'General Shade! Eu sabia que você estava por trás de tudo isso! Acaba aqui e agora, eu vou proteger essa Torre!',
        cor: '#4fc3f7',
        fundo: 'cobertura'
    },
]

// ─── Fala pós-luta Fase 3 (General Shade desarmado) ───────────
const FALAS_POS_LUTA_FASE3 = [
    {
        personagem: 'General Shade',
        fala: 'Você falhou, Pedrion... olhe para o céu. Eu fui apenas o peão do verdadeiro fim.',
        cor: '#ffaa00',
        fundo: 'cobertura_vitoria'
    },
]

// ═══════════════════════════════════════════════════════════════
//  ROTEIRO — Fase 4: O Chefão Apocalíptico
// ═══════════════════════════════════════════════════════════════
const FALAS_FASE4 = [
    {
        personagem: 'Narrador',
        fala: 'O céu fica completamente vermelho-sangue e o telhado da Torre começa a rachar. O gigantesco e demoníaco Zul\'Kahr surge do portal místico. Ele usou toda a distração dos vilões anteriores para capturar Ravena e Estelar, que agora estão presas em runas de energia mística no topo da Torre.',
        cor: '#c8b8ff',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Zul\'Kahr',
        fala: 'O MUNDO DOS MORTAIS CAIRÁ DIANTE DE MIM! NINGUÉM PODE ME IMPEDIR!',
        cor: '#ff2200',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Mutávio',
        fala: 'O Pedrion me mandou defender a Torre... e ninguém toca nos meus amigos! Vocês pegaram a Estelar e... NINGUÉM MACHUCA A RAVENA! Agora o bicho vai pegar!',
        cor: '#66ff66',
        fundo: 'lutaFinal'
    },
]

// ─── Transição da Fase 4 (Zul'Kahr perde a 1ª barra de vida e se transforma) ──
// Dispara no meio da luta, quando a vida da 1ª forma do chefão chega a 0.
// A gameplay "pausa" (mesmo sistema de cutscene usado no resto do jogo) pra
// mostrar o diálogo, e ao terminar o Zul'Kahr volta com mais vida e uma aura
// diferente (ver Vilao.js → des_vilao, propriedade "transformado").
const FALAS_TRANSICAO_FASE4 = [
    {
        personagem: 'Narrador',
        fala: 'O corpo de Zul\'Kahr racha como pedra vulcânica. Uma energia roxa e sombria escapa das fendas, envolvendo-o por completo. O ar fica pesado, e o céu vermelho começa a piscar em tons de violeta.',
        cor: '#c8b8ff',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Zul\'Kahr',
        fala: 'ARGH! IMPOSSÍVEL! UM MERO MORTAL FERIU A MINHA CARNE?! Vocês despertaram algo que este mundo não estava pronto para enfrentar... ISSO AINDA NÃO ACABOU!',
        cor: '#ff2200',
        fundo: 'lutaFinal'
    },
    {
        personagem: 'Mutávio',
        fala: 'Forma nova, mesma cara feia! Não importa quantas vezes você mude, eu não vou recuar! Vou até o final, custe o que custar!',
        cor: '#66ff66',
        fundo: 'lutaFinal'
    },
]

// ─── Epílogo pós-luta Fase 4 (final do jogo) ──────────────────
const FALAS_POS_LUTA_FASE4 = [
    {
        personagem: 'Narrador',
        fala: 'Com um último ataque devastador em sua forma de T-Rex, Mutávio quebra as runas místicas de Zul\'Kahr. O portal colapsa, sugando o demônio de volta para a sua dimensão escura. O céu vermelho se dissipa, revelando a noite em Itapema City.',
        cor: '#c8b8ff',
        fundo: 'torre'
    },
    {
        personagem: 'Estelar',
        fala: 'Glorioso! Sabíamos que vocês conseguiriam!',
        cor: '#ffd166',
        fundo: 'torre'
    },
    {
        personagem: 'Ravena',
        fala: 'Obrigada, Mutávio... e obrigado a todos. Vocês chegaram bem na hora.',
        cor: '#b388ff',
        fundo: 'torre'
    },
    {
        personagem: 'Pedrion',
        fala: 'Excelente trabalho, Titãs! Kreftalad conteve o Doutor Solaris, Daviborg salvou nossos sistemas, eu enfrentei o General Shade e o Mutávio garantiu a nossa vitória final.',
        cor: '#4fc3f7',
        fundo: 'torre'
    },
    {
        personagem: 'Daviborg',
        fala: 'É isso aí! Ninguém mexe com a nossa Torre e sai ileso! O que acham de comemorarmos com uma disputa de videogame e muita pizza?',
        cor: '#81c784',
        fundo: 'torre'
    },
    {
        personagem: 'Mutávio',
        fala: 'Desde que a pizza seja vegetariana, eu topo na hora! Ganhamos o dia, galera!',
        cor: '#66ff66',
        fundo: 'torre'
    },
    {
        personagem: 'Narrador',
        fala: 'E assim, trabalhando em equipe e confiando na liderança e nas habilidades de cada um, os Jovens Titãs salvaram as meninas, protegeram sua casa e trouxeram a paz de volta para Jump City.',
        cor: '#c8b8ff',
        fundo: 'torre'
    },
]
 
// ═══════════════════════════════════════════════════════════════
//  FLUXO
// ═══════════════════════════════════════════════════════════════
function iniciar_luta() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5 // Velocidade de movimentação do vilão aumentada (era 2.5)
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 1
    tela = 'jogando'
}

function iniciar_luta_fase2() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 2
    tela = 'jogando'
}

function iniciar_luta_fase3() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
 
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 10 ; vilao.vidaMax = 10
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
 
    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 3
    tela = 'jogando'
}

function iniciar_luta_fase4() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 15 ; heroi.vidaMax = 15
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0

    // ── ZUL'KAHR — CHEFÃO FINAL ──────────────────────────────────
    // Combate em 2 formas: a 1ª forma tem 15 de vida; ao zerar, entra
    // uma cutscene de transição (FALAS_TRANSICAO_FASE4) e ele volta com
    // mais 10 de vida e uma aura diferente (ver iniciar_transicao_fase4
    // e Vilao.js → des_vilao / propriedade "transformado").
    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 15 ; vilao.vidaMax = 15
    vilao.velY = 3.5
    vilao.timerTiro = 60 ; vilao.intervalTiro = 70
    vilao.padraoAtaque = 0        // qual dos padrões de ataque vem a seguir
    vilao._timerImprevisto = 0    // usado no movimento errático (ver Vilao.js → mov())
    vilao.transformado = false    // 2ª forma (aura diferente) ainda não ativada

    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    fase = 4
    tela = 'jogando'
}
 
function iniciar_luta_1v1() {
    heroi.x = 100 ; heroi.y = 300
    heroi.vida = 5 ; heroi.vidaMax = 5
    heroi.dirX = 0 ; heroi.dirY = 0
    heroi.cooldownTiro = 0
    heroi.timerSpriteAtirando = 0

    vilao.x = 1050 ; vilao.y = 280
    vilao.vida = 5 ; vilao.vidaMax = 5 // No 1 V 1 o vilão fica com 5 vidas, igual ao herói (no modo história continua 10)
    vilao.velY = 3.5
    vilao.timerTiro = 70 ; vilao.intervalTiro = 70
    vilao.dirY = 0
    vilao.cooldownTiro = 0
    vilao.timerSpriteAtirando = 0

    tirosHeroi = [] ; tirosVilao = [] ; coletaveis = []
    timerCoracao = 0
    modo1v1 = true
    tela = 'jogando'
}

function iniciar_cutscene_intro() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE1, IMG, () => {
        iniciar_luta()          // ao terminar as falas → vai pra luta
    })
}

function iniciar_cutscene_fase2() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE2, IMG, () => {
        iniciar_luta_fase2()    // ao terminar as falas → vai pra luta da Fase 2
    })
}

function iniciar_cutscene_fase3() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE3, IMG, () => {
        iniciar_luta_fase3()    // ao terminar as falas → vai pra luta da Fase 3
    })
}

function iniciar_cutscene_fase4() {
    tela = 'cutscene'
    cena.iniciar(FALAS_FASE4, IMG, () => {
        iniciar_luta_fase4()    // ao terminar as falas → vai pra luta da Fase 4
    })
}

// "Pausa" a gameplay no meio da luta contra o Zul'Kahr (1ª forma zerou a
// vida) pra mostrar o diálogo de transição. Ao terminar, ele volta pra
// luta com mais vida (2ª forma) e uma aura diferente.
function iniciar_transicao_fase4() {
    tela = 'cutscene'
    cena.iniciar(FALAS_TRANSICAO_FASE4, IMG, () => {
        vilao.vida = 10 ; vilao.vidaMax = 10   // 2ª forma: mais 10 de vida
        vilao.transformado = true              // ativa a aura diferente (ver Vilao.js)
        vilao.padraoAtaque = 0
        vilao.timerTiro = 60 ; vilao.intervalTiro = 65 // um pouco mais agressivo na 2ª forma
        tela = 'jogando'
    })
}
 
function iniciar_cutscene_pos_luta() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA, IMG, () => {
        tela = 'vitoria_fase1'  // ao terminar → tela de vitória
    })
}

function iniciar_cutscene_pos_luta_fase2() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE2, IMG, () => {
        tela = 'vitoria_fase2'  // ao terminar → tela de vitória da Fase 2
    })
}

function iniciar_cutscene_pos_luta_fase3() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE3, IMG, () => {
        tela = 'vitoria_fase3'  // ao terminar → tela de vitória da Fase 3
    })
}

function iniciar_cutscene_pos_luta_fase4() {
    tela = 'cutscene'
    cena.iniciar(FALAS_POS_LUTA_FASE4, IMG, () => {
        tela = 'vitoria'        // ao terminar → tela final do jogo (Zul'Kahr derrotado)
    })
}
 
// ═══════════════════════════════════════════════════════════════
//  CONTROLES TECLADO
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
    if (tela === 'jogando') {
        // Jogador 1 (Herói): W / S sempre disponíveis
        if (e.key === 'w' || e.key === 'W') heroi.dirY = -1
        if (e.key === 's' || e.key === 'S') heroi.dirY =  1

        if (modo1v1) {
            // No modo 1 V 1 ninguém se move para os lados — só para cima/baixo
            // Jogador 2 (Vilão): Seta Cima / Seta Baixo para mover, P para atirar
            if (e.key === 'ArrowUp')   { e.preventDefault(); vilao.dirY = -1 }
            if (e.key === 'ArrowDown') { e.preventDefault(); vilao.dirY =  1 }
            if (e.key === 'p' || e.key === 'P') { e.preventDefault(); atirar_vilao_jogador() }
        } else {
            // Modo história: Herói pode se mover livremente pelos 2 eixos
            if (e.key === 'a' || e.key === 'A') heroi.dirX = -1
            if (e.key === 'd' || e.key === 'D') heroi.dirX =  1
        }

        if (e.key === ' ') { e.preventDefault(); atirar_heroi() }
    }
    if (tela === 'cutscene') {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cena.avancar() }
    }
})
document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W') heroi.dirY = 0
    if (e.key === 's' || e.key === 'S') heroi.dirY = 0
    if (e.key === 'a' || e.key === 'A') heroi.dirX = 0
    if (e.key === 'd' || e.key === 'D') heroi.dirX = 0
    if (e.key === 'ArrowUp')   vilao.dirY = 0
    if (e.key === 'ArrowDown') vilao.dirY = 0
})
 
// ─── CLIQUE ───────────────────────────────────────────────────
document.getElementById('des').addEventListener('click', (e) => {
    let r  = document.getElementById('des').getBoundingClientRect()
    let cx = e.clientX - r.left
    let cy = e.clientY - r.top
 
    // Botão genérico: clicou(centroX, centroY, largura, altura)
    function btn(bx, by, lw = 400, lh = 55) {
        return cx > bx - lw/2 && cx < bx + lw/2 &&
               cy > by - lh   && cy < by + 10
    }
 
    if (tela === 'menu') {
        if (btn(600, 285)) iniciar_cutscene_intro()
        if (btn(600, 375)) { sel1v1 = { vilao: null, heroi: null } ; tela = 'selecao1v1' }
        if (btn(600, 465)) tela = 'manual'
        if (btn(600, 555)) tela = 'sobre'
    }
    if (tela === 'manual')  { if (btn(600, 665)) tela = 'menu' }
    if (tela === 'sobre')   {
        if (btn(600, 645)) tela = 'menu'
        DESENVOLVEDORES.forEach((d, i) => {
            let c = posCardDev(i)
            if (d.instagram && d.instagram.url && cx > c.x + 140 && cx < c.x + 540 && cy > c.y + 70 && cy < c.y + 92) {
                window.open(d.instagram.url, '_blank')
            }
            if (d.github && d.github.url && cx > c.x + 140 && cx < c.x + 540 && cy > c.y + 88 && cy < c.y + 110) {
                window.open(d.github.url, '_blank')
            }
        })
    }

    if (tela === 'selecao1v1') {
        // Grade 2x2 desenhada em _grade_selecao: cards de 220x240, gap 20, início y=110
        function clicouCard(colX, i) {
            let itemW = 220, itemH = 240, gap = 20
            let gridW = itemW * 2 + gap
            let startX = colX - gridW / 2
            let startY = 110
            let col = i % 2
            let row = Math.floor(i / 2)
            let boxX = startX + col * (itemW + gap)
            let boxY = startY + row * (itemH + gap)
            return cx > boxX && cx < boxX + itemW && cy > boxY && cy < boxY + itemH
        }
        // Coluna esquerda: escolha do herói (Jogador 1)
        HEROIS_1V1.forEach((nome, i) => { if (clicouCard(300, i)) sel1v1.heroi = nome })
        // Coluna direita: escolha do vilão (Jogador 2)
        VILOES_1V1.forEach((nome, i) => { if (clicouCard(900, i)) sel1v1.vilao = nome })

        if (btn(300, 665)) tela = 'menu'
        if (btn(900, 665) && sel1v1.vilao && sel1v1.heroi) iniciar_luta_1v1()
    }

    if (tela === 'cutscene') cena.avancar()
 
    if (tela === 'vitoria_fase1') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase2()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria_fase2') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase3()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria_fase3') {
        // Botão "Próximo Desafio" (centro 600, y ~530)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_fase4()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria_fase4') {
        // Botão "Continuar" → leva ao diálogo final (epílogo)
        if (btn(600, 555, 340, 52)) iniciar_cutscene_pos_luta_fase4()
        // Botão "Menu Principal" (centro 600, y ~612)
        if (btn(600, 630, 240, 35)) tela = 'menu'
    }
    if (tela === 'vitoria') {
        if (modo1v1) {
            // Tela final 1v1 (telas.desenha_final_1v1): mesmos botões "JOGAR NOVAMENTE" e "MENU"
            if (btn(600, 430)) iniciar_luta_1v1()
            if (btn(600, 520)) { modo1v1 = false ; tela = 'menu' }
        } else {
            // Tela final (telas.desenha_vitoria): "JOGAR NOVAMENTE" e "MENU"
            if (btn(600, 430)) iniciar_cutscene_intro()
            if (btn(600, 520)) tela = 'menu'
        }
    }
    if (tela === 'derrota') {
        if (modo1v1) {
            if (btn(600, 440)) iniciar_luta_1v1()
            if (btn(600, 530)) { modo1v1 = false ; tela = 'menu' }
        } else {
            if (btn(600, 440)) {
                // <── "Tentar Novamente" reinicia a fase atual (não volta pro início do jogo)
                if      (fase === 2) iniciar_luta_fase2()
                else if (fase === 3) iniciar_luta_fase3()
                else if (fase === 4) iniciar_luta_fase4()
                else iniciar_luta()
            }
            if (btn(600, 530)) tela = 'menu'
        }
    }
})
 
// ═══════════════════════════════════════════════════════════════
//  MECÂNICA DE JOGO
// ═══════════════════════════════════════════════════════════════
function atirar_heroi() {
    if (heroi.cooldownTiro > 0) return
    // Cooldown: 0,4s (24 quadros a 60fps) no 1 V 1 pra evitar spam de tiro; modo história continua 18 quadros (~0,3s)
    heroi.cooldownTiro = modo1v1 ? 24 : 18
    // Velocidade do tiro do herói: 20 no modo história (aumentada, era 14)
    // No 1 V 1, fica igualada à do vilão (14) para o duelo ser parelho
    let velTiroHeroi = modo1v1 ? 14 : 20
    tirosHeroi.push(new Tiro(heroi.x + heroi.w, heroi.y + heroi.h/2 - 3, velTiroHeroi, 0, 'heroi'))
    heroi.timerSpriteAtirando = 14 // quadros que o sprite "atirando" fica visível (1V1)
}
 
function atirar_vilao() {
    let tx = vilao.x
    let ty = vilao.y + vilao.h / 2
    // Velocidade do tiro do vilão diminuída (valores absolutos menores que antes)
    ;[
        {vx:-7, vy:  0},
        {vx:-6, vy: -3},
        {vx:-6, vy:  3},
    ].forEach(a => tirosVilao.push(new Tiro(tx, ty, a.vx, a.vy, 'vilao')))
}

// Disparo do Jogador 2 no modo 1 V 1 (tecla P), com cooldown próprio
// Apenas 1 tiro, com velocidade igualada à do herói no 1 V 1 (14) — duelo parelho
// Cooldown de 0,4s (24 quadros a 60fps), igual ao do herói, pra não virar spam de tiro
// (a rajada de 3 tiros de atirar_vilao() continua exclusiva do modo história/IA)
function atirar_vilao_jogador() {
    if (vilao.cooldownTiro > 0) return
    vilao.cooldownTiro = 24
    let tx = vilao.x
    let ty = vilao.y + vilao.h / 2
    tirosVilao.push(new Tiro(tx, ty, -14, 0, 'vilao'))
    vilao.timerSpriteAtirando = 14 // quadros que o sprite "atirando" fica visível (1V1)
}

// ═══════════════════════════════════════════════════════════════
//  ZUL'KAHR — CHEFÃO FINAL (só entra na Fase 4; as demais fases
//  continuam usando atirar_vilao() exatamente como antes)
// ═══════════════════════════════════════════════════════════════
function atirar_vilao_fase4() {
    let tx = vilao.x
    let ty = vilao.y + vilao.h / 2

    // A partir da metade da vida, o chefão entra em "fúria final": atira mais rápido
    let furia = vilao.vida <= vilao.vidaMax / 2

    let padrao = vilao.padraoAtaque % 4

    if (padrao === 0) {
        // Leque de 5 tiros
        ;[
            {vx:-8, vy:  0},
            {vx:-7, vy: -3},
            {vx:-7, vy:  3},
            {vx:-6, vy: -6},
            {vx:-6, vy:  6},
        ].forEach(a => tirosVilao.push(new Tiro(tx, ty, a.vx, a.vy, 'vilao')))

    } else if (padrao === 1) {
        // Tiro mirado, calculado na posição atual do herói
        let dx = (heroi.x + heroi.w / 2) - tx
        let dy = (heroi.y + heroi.h / 2) - ty
        let dist = Math.max(1, Math.sqrt(dx * dx + dy * dy))
        let vel = 12
        tirosVilao.push(new Tiro(tx, ty, (dx / dist) * vel, (dy / dist) * vel, 'vilao'))
        if (furia) {
            // Na fúria, manda um segundo tiro mirado logo ao lado
            tirosVilao.push(new Tiro(tx, ty + 20, (dx / dist) * vel, (dy / dist) * vel, 'vilao'))
        }

    } else if (padrao === 2) {
        // Parede vertical: 4 tiros retos em alturas diferentes
        ;[-90, -30, 30, 90].forEach(dy => {
            tirosVilao.push(new Tiro(tx, vilao.y + vilao.h / 2 + dy, -9, 0, 'vilao'))
        })

    } else {
        // Rajada reta veloz (mais tiros ainda na fúria final)
        let n = furia ? 4 : 2
        for (let i = 0; i < n; i++) {
            tirosVilao.push(new Tiro(tx, ty + (i - (n - 1) / 2) * 16, -13, 0, 'vilao'))
        }
    }

    vilao.padraoAtaque++
    vilao.intervalTiro = furia ? 48 : 70 // fúria final = ataca com mais frequência (mas não impossível)
}
 
function spawn_coracao() {
    timerCoracao++
    // Na fase do Mutávio (chefão final) os corações aparecem bem mais seguido,
    // já que a luta é mais longa e mais puxada
    let intervalo = (fase === 4) ? Math.floor(INTERVALO_CORACAO / 2.5) : INTERVALO_CORACAO
    if (timerCoracao >= intervalo) {
        timerCoracao = 0
        coletaveis.push(new Coletavel(Math.floor(Math.random() * 800 + 100), -30))
    }
}
 
function colisoes() {
    tirosHeroi.forEach(t => {
        if (t.ativo && t.colid(vilao)) { t.ativo = false; vilao.vida--; telas.ativar_flash() }
    })
    tirosVilao.forEach(t => {
        if (t.ativo && t.colid(heroi)) {
            t.ativo = false; heroi.vida--; telas.ativar_flash()
        }
    })
    coletaveis.forEach(c => {
        if (c.ativo && heroi.colid(c)) {
            c.ativo = false
            heroi.vida = Math.min(heroi.vida + 1, heroi.vidaMax)
        }
    })
}
 
function verificar_estado() {
    if (heroi.vida <= 0)  { tela = 'derrota'; return }
    if (vilao.vida <= 0)  {
        if (modo1v1) { tela = 'vitoria'; return }
        if (fase === 4 && !vilao.transformado) { iniciar_transicao_fase4(); return } // <── 1ª forma zerou: pausa e transforma
        if      (fase === 2) iniciar_cutscene_pos_luta_fase2()
        else if (fase === 3) iniciar_cutscene_pos_luta_fase3()
        else if (fase === 4) tela = 'vitoria_fase4' // <── mostra a tela de vitória antes do diálogo final
        else iniciar_cutscene_pos_luta()
    }
}
 
// ═══════════════════════════════════════════════════════════════
//  DESENHO DO FUNDO DE LUTA
// ═══════════════════════════════════════════════════════════════
function desenha_fundo_luta() {
    let fundo = fase === 2 ? IMG.lab
              : fase === 3 ? IMG.cobertura
              : fase === 4 ? IMG.lutaFinal
              : IMG.praia // <── fundo da luta troca conforme a fase
    if (fundo.complete && fundo.naturalWidth > 0) {
        des.drawImage(fundo, 0, 0, 1200, 700)
        des.fillStyle = 'rgba(0,0,0,0.22)'
        des.fillRect(0, 0, 1200, 700)
    } else {
        des.fillStyle = '#06001a'
        des.fillRect(0, 0, 1200, 700)
    }
}
 
// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 1
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase1() {
    // Fundo = imagem de vitória (mantém a proporção original da arte, sem esticar)
    let img = IMG.vitoria
    if (img.complete && img.naturalWidth > 0) {
        let imgH = 1200 * (img.naturalHeight / img.naturalWidth)
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
        des.drawImage(img, 0, 0, 1200, imgH)
        // Transição suave da arte para o painel inferior
        let fade = des.createLinearGradient(0, imgH - 90, 0, imgH)
        fade.addColorStop(0, 'rgba(10,26,48,0)')
        fade.addColorStop(1, 'rgba(10,26,48,1)')
        des.fillStyle = fade
        des.fillRect(0, imgH - 90, 1200, 90)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }

    des.textAlign = 'center'

    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx = 600, by = 534, bw = 360, bh = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx - bw/2 + 2, by - bh/2 + 2, bw, bh)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx - bw/2, by - bh/2, bw, bh)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx - bw/2, by - bh/2, bw, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx - bw/2, by - bh/2, bw, bh)
    // Texto pulsante
    let ap = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx, by)
    des.textBaseline = 'alphabetic'

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx = 600, my = 616, mw = 270, mh = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx - mw/2, my - mh/2, mw, mh)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx - mw/2, my - mh/2, mw, mh)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx, my)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}

// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 2
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase2() {
    // Fundo = imagem de vitória (mantém a proporção original da arte, sem esticar)
    let img2 = IMG.lab_vitoria
    if (img2.complete && img2.naturalWidth > 0) {
        let imgH2 = 1200 * (img2.naturalHeight / img2.naturalWidth)
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
        des.drawImage(img2, 0, 0, 1200, imgH2)
        // Transição suave da arte para o painel inferior
        let fade2 = des.createLinearGradient(0, imgH2 - 90, 0, imgH2)
        fade2.addColorStop(0, 'rgba(10,26,48,0)')
        fade2.addColorStop(1, 'rgba(10,26,48,1)')
        des.fillStyle = fade2
        des.fillRect(0, imgH2 - 90, 1200, 90)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }

    des.textAlign = 'center'

    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx2 = 600, by2 = 534, bw2 = 360, bh2 = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx2 - bw2/2 + 2, by2 - bh2/2 + 2, bw2, bh2)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx2 - bw2/2, by2 - bh2/2, bw2, bh2)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx2 - bw2/2, by2 - bh2/2, bw2, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx2 - bw2/2, by2 - bh2/2, bw2, bh2)
    // Texto pulsante
    let ap2 = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap2})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx2, by2)
    des.textBaseline = 'alphabetic'

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx2 = 600, my2 = 616, mw2 = 270, mh2 = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx2 - mw2/2, my2 - mh2/2, mw2, mh2)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx2 - mw2/2, my2 - mh2/2, mw2, mh2)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx2, my2)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}

// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 3
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase3() {
    // Fundo = imagem de vitória (mantém a proporção original da arte, sem esticar)
    let img3 = IMG.cobertura_vitoria
    if (img3.complete && img3.naturalWidth > 0) {
        let imgH3 = 1200 * (img3.naturalHeight / img3.naturalWidth)
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
        des.drawImage(img3, 0, 0, 1200, imgH3)
        // Transição suave da arte para o painel inferior
        let fade3 = des.createLinearGradient(0, imgH3 - 90, 0, imgH3)
        fade3.addColorStop(0, 'rgba(10,26,48,0)')
        fade3.addColorStop(1, 'rgba(10,26,48,1)')
        des.fillStyle = fade3
        des.fillRect(0, imgH3 - 90, 1200, 90)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }

    des.textAlign = 'center'

    // ── BOTÃO PRÓXIMO DESAFIO ──────────────────────────────
    let bx3 = 600, by3 = 534, bw3 = 360, bh3 = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx3 - bw3/2 + 2, by3 - bh3/2 + 2, bw3, bh3)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx3 - bw3/2, by3 - bh3/2, bw3, bh3)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx3 - bw3/2, by3 - bh3/2, bw3, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx3 - bw3/2, by3 - bh3/2, bw3, bh3)
    // Texto pulsante
    let ap3 = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap3})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  PRÓXIMO DESAFIO', bx3, by3)
    des.textBaseline = 'alphabetic'

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx3 = 600, my3 = 616, mw3 = 270, mh3 = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx3 - mw3/2, my3 - mh3/2, mw3, mh3)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx3 - mw3/2, my3 - mh3/2, mw3, mh3)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx3, my3)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}

// ═══════════════════════════════════════════════════════════════
//  TELA DE VITÓRIA FASE 4 (FINAL)
// ═══════════════════════════════════════════════════════════════
function desenha_vitoria_fase4() {
    // Fundo = imagem de vitória (mantém a proporção original da arte, sem esticar)
    let img4 = IMG.lutaFinal_vitoria
    if (img4.complete && img4.naturalWidth > 0) {
        let imgH4 = 1200 * (img4.naturalHeight / img4.naturalWidth)
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
        des.drawImage(img4, 0, 0, 1200, imgH4)
        // Transição suave da arte para o painel inferior
        let fade4 = des.createLinearGradient(0, imgH4 - 90, 0, imgH4)
        fade4.addColorStop(0, 'rgba(10,26,48,0)')
        fade4.addColorStop(1, 'rgba(10,26,48,1)')
        des.fillStyle = fade4
        des.fillRect(0, imgH4 - 90, 1200, 90)
    } else {
        des.fillStyle = '#0a1a30'
        des.fillRect(0, 0, 1200, 700)
    }

    des.textAlign = 'center'

    // ── BOTÃO CONTINUAR (leva ao diálogo final) ────────────
    let bx4 = 600, by4 = 534, bw4 = 360, bh4 = 52
    // Sombra
    des.fillStyle = '#0e2800'
    des.fillRect(bx4 - bw4/2 + 2, by4 - bh4/2 + 2, bw4, bh4)
    // Fundo
    des.fillStyle = '#1e5200'
    des.fillRect(bx4 - bw4/2, by4 - bh4/2, bw4, bh4)
    // Brilho topo
    des.fillStyle = 'rgba(255,255,255,0.10)'
    des.fillRect(bx4 - bw4/2, by4 - bh4/2, bw4, 10)
    // Borda
    des.strokeStyle = '#55ff22'
    des.lineWidth   = 2
    des.strokeRect(bx4 - bw4/2, by4 - bh4/2, bw4, bh4)
    // Texto pulsante
    let ap4 = 0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 400))
    des.fillStyle    = `rgba(140,255,70,${ap4})`
    des.font         = '14px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('▶  CONTINUAR', bx4, by4)
    des.textBaseline = 'alphabetic'

    // ── BOTÃO MENU PRINCIPAL ───────────────────────────────
    let mx4 = 600, my4 = 616, mw4 = 270, mh4 = 38
    des.fillStyle   = 'rgba(255,255,255,0.08)'
    des.fillRect(mx4 - mw4/2, my4 - mh4/2, mw4, mh4)
    des.strokeStyle = 'rgba(255,255,255,0.28)'
    des.lineWidth   = 1
    des.strokeRect(mx4 - mw4/2, my4 - mh4/2, mw4, mh4)
    des.fillStyle    = 'rgba(255,255,255,0.6)'
    des.font         = '10px "Press Start 2P"'
    des.textBaseline = 'middle'
    des.fillText('MENU PRINCIPAL', mx4, my4)
    des.textBaseline = 'alphabetic'

    des.textAlign = 'left'
}
 
// ═══════════════════════════════════════════════════════════════
//  LOOP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
function desenha() {
    des.clearRect(0, 0, 1200, 700)
 
    if      (tela === 'menu')          telas.desenha_menu()
    else if (tela === 'manual')        telas.desenha_manual()
    else if (tela === 'sobre')         telas.desenha_sobre()
    else if (tela === 'selecao1v1')    telas.desenha_selecao_1v1(VILOES_1V1, HEROIS_1V1, sel1v1.vilao, sel1v1.heroi)
    else if (tela === 'cutscene')      cena.desenha()
    else if (tela === 'vitoria_fase1') desenha_vitoria_fase1()
    else if (tela === 'vitoria_fase2') desenha_vitoria_fase2()
    else if (tela === 'vitoria_fase3') desenha_vitoria_fase3()
    else if (tela === 'vitoria_fase4') desenha_vitoria_fase4()

    else if (tela === 'vitoria')       modo1v1 ? telas.desenha_final_1v1(true, sel1v1.heroi, sel1v1.vilao) : telas.desenha_vitoria()
    else if (tela === 'derrota')       modo1v1 ? telas.desenha_final_1v1(false, sel1v1.heroi, sel1v1.vilao) : telas.desenha_derrota(fase)
    else if (tela === 'jogando') {
        desenha_fundo_luta()
        coletaveis.forEach(c => c.des_coracao())
        tirosHeroi.forEach(t => t.des_tiro())
        tirosVilao.forEach(t => t.des_tiro())
        heroi.des_heroi()
        vilao.des_vilao()
        telas.desenha_flash()
        telas.desenha_hud(heroi, vilao, fase, modo1v1 ? sel1v1.heroi : null, modo1v1 ? sel1v1.vilao : null)
    }
}
 
function atualiza() {
    telas.atualiza()
 
    if (tela === 'cutscene') { cena.atualiza(); return }
    if (tela !== 'jogando')  return
 
    heroi.mov()

    if (modo1v1) {
        frameSprite1v1++
        // Modo 1 V 1: vilão é o Jogador 2, controlado por teclado (sem IA)
        vilao.mov_jogador()
    } else {
        // Modo história: vilão controlado por IA
        vilao.mov()
        if (vilao.podeAtirar()) {
            if (fase === 4) atirar_vilao_fase4() // chefão final: padrão de ataque próprio
            else atirar_vilao()
        }
    }
 
    tirosHeroi.forEach(t => t.mov())
    tirosHeroi = tirosHeroi.filter(t => t.ativo)
 
    tirosVilao.forEach(t => t.mov())
    tirosVilao = tirosVilao.filter(t => t.ativo)
 
    coletaveis.forEach(c => c.mov())
    coletaveis = coletaveis.filter(c => c.ativo)
 
    if (!modo1v1) spawn_coracao() // Corações só aparecem no modo história, não no 1 V 1
    colisoes()
    verificar_estado()
}
 
function main() {
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
 
main()