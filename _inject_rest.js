const fs = require('fs');
const path = 'c:/Users/Dullio Macedo/OneDrive/Documents/Arquivos Antigravity/workspaces/giborba/website-gi-borba/gi-borba/index.html';

function gCard(num, anchor, cat, title, def, p1, p2, p3, cta) {
  return `
      <div class="glossary-card" id="${anchor}" data-category="${cat}">
        <span class="glossary-card__num">Verbete ${num.toString().padStart(2,'0')}</span>
        <span class="glossary-card__cat">${cat}</span>
        <h3 class="glossary-card__title">${title}</h3>
        <blockquote class="glossary-card__definition">${def}</blockquote>
        <div class="glossary-card__body">
          <p>${p1}</p>
          <p>${p2}</p>
          <p>${p3}</p>
        </div>
        ${cta ? `<a href="https://wa.me/5511987530304?text=Quero%20fazer%20uma%20aula%20experimental%20gratuita" class="glossary-card__cta" target="_blank" rel="noopener noreferrer">Gi ensina nas aulas ao vivo</a>` : ''}
      </div>`;
}

const glossarioHtml = `
<!-- GLOSSÁRIO -->
<section id="glossario" class="section" aria-labelledby="glossario-heading">
  <div class="container">
    <span class="section-label">Vocabulário</span>
    <h2 id="glossario-heading" class="section-heading">Termos usados</h2>
    <p class="section-intro">22 verbetes para entender yoga antes mesmo de começar. Filtrados por categoria ou pesquisa livre.</p>

    <div class="glossario__controls">
      <div class="glossario__search" role="search">
        <span class="glossario__search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <label for="glossario-search" class="sr-only">Buscar termos do glossário</label>
        <input type="search" id="glossario-search" placeholder="Buscar termos..." aria-label="Buscar termos do glossário">
      </div>
      <div class="glossario__tabs" role="group" aria-label="Filtrar por categoria">
        <button class="glossario__tab glossario__tab--active" data-category="all" aria-pressed="true">Todos</button>
        <button class="glossario__tab" data-category="Conceito Fundamental" aria-pressed="false">Conceito Fundamental</button>
        <button class="glossario__tab" data-category="Prática" aria-pressed="false">Prática</button>
        <button class="glossario__tab" data-category="Modalidade" aria-pressed="false">Modalidades</button>
        <button class="glossario__tab" data-category="Mito" aria-pressed="false">Mitos</button>
        <button class="glossario__tab" data-category="Benefício" aria-pressed="false">Benefícios</button>
      </div>
    </div>

    <div class="glossario__grid" aria-label="Glossário de termos de yoga">
` +
gCard(1,'o-que-e-yoga-glossario','Conceito Fundamental','Yoga',
  'Yoga é uma prática que combina movimento, respiração e atenção ao corpo. Não é religião, não exige flexibilidade e não depende de nenhuma crença espiritual. É uma ferramenta de autorregulação — aprende-se a usar o próprio corpo para reduzir ansiedade, melhorar o sono e recuperar a sensação de estar inteira.',
  'Quando alguém diz "yoga não é para mim", geralmente está pensando nas imagens que circulam nas redes sociais: pessoas jovens, magras, em posturas impossíveis, com fundo de pôr do sol e expressão de iluminada. Isso não é yoga. Isso é a performance do yoga — e confundir as duas coisas afasta exatamente quem mais se beneficiaria da prática.',
  'No seu núcleo, yoga é simples: mover o corpo com atenção, respirar com consciência e criar um espaço onde a mente, pressionada por tudo que precisa fazer, possa finalmente parar. Por isso funciona para ansiedade, insônia e dor crônica — não por misticismo, mas por biologia. Quando você respira devagar e move o corpo com intenção, o sistema nervoso responde.',
  'Há mais de dois mil anos de prática e pesquisa acumulada sobre o que yoga faz com o corpo humano. E o que a ciência confirma hoje, os praticantes já sabiam: uma hora de yoga bem conduzida muda a química do corpo de formas que nenhuma lista de tarefas consegue alcançar.',true)+
gCard(2,'asana','Prática','Asana',
  'Asana é a palavra sânscrita para postura — a posição específica que o corpo assume durante a prática do yoga. Cada asana tem uma forma e um propósito: algumas alongam, outras fortalecem, outras abrem o quadril ou estimulam a respiração. A postura "certa" é sempre a versão que o seu corpo consegue fazer hoje.',
  'O grande equívoco sobre asanas é achar que existe uma forma única e ideal que todos devem alcançar. Na prática real, cada postura é um ponto de chegada relativo. O que importa não é parecer com a ilustração do livro, mas sentir o que a postura propõe — o alongamento, a força, o equilíbrio — dentro dos limites do seu corpo hoje.',
  'Uma professora experiente nunca pede que você "chegue" a uma postura. Ela observa onde você está, entende o que o seu corpo pode e oferece adaptações — mais suaves ou mais intensas — para que o propósito da postura seja alcançado, independentemente da forma.',
  'Com o tempo e a prática regular, o corpo vai abrindo. Posturas que pareciam impossíveis se tornam acessíveis — não porque você forçou, mas porque o tecido conjuntivo cedeu gradualmente, a força muscular sustentou o que antes escapava, e a respiração aprendeu a trabalhar a seu favor.',false)+
gCard(3,'pranayama','Prática','Pranayama',
  'Pranayama é a prática consciente da respiração no yoga. Prana significa energia vital — aquilo que a respiração carrega. Pranayama não é "respirar fundo" de qualquer jeito: é usar o ritmo, a profundidade e a pausa da respiração como ferramentas deliberadas para regular o sistema nervoso, reduzir a ansiedade e preparar o corpo para o descanso.',
  'A respiração é o único sistema involuntário do corpo que também pode ser controlado conscientemente. Isso a torna única: ela funciona no automático quando você não pensa nela, mas responde imediatamente quando você começa a dirigi-la. E essa capacidade de interferir no automático é exatamente o que o pranayama explora.',
  'Quando você está ansiosa, a respiração fica curta, acelerada e superficial — o peito se contrai, o diafragma mal se move. O corpo interpreta isso como sinal de perigo e libera mais cortisol. O ciclo se retroalimenta. Pranayama interrompe esse ciclo de fora para dentro: ao mudar o padrão da respiração, você muda a mensagem que o corpo recebe.',
  'Em termos práticos: uma expiração longa e completa — mais longa do que a inspiração — ativa o nervo vago e desacelera o coração em segundos. Isso não é sugestão, é fisiologia. E é o que toda boa professora de yoga usa sem precisar nomear como "técnica".',false)+
gCard(4,'savasana','Prática','Savasana',
  'Savasana é o descanso final de toda aula de yoga: o praticante deita de costas, fecha os olhos e fica imóvel por alguns minutos. É o momento em que o sistema nervoso integra tudo o que foi trabalhado na aula. Para quem vive no modo acelerado, savasana costuma ser a postura mais difícil — e a mais necessária.',
  'O nome vem do sânscrito: sava significa cadáver. A postura do cadáver. Não por morbidez, mas por precisão: é a postura de quem largou completamente — sem tensão muscular, sem agenda, sem próxima coisa a fazer. O paradoxo do savasana é que exige esforço para não fazer esforço.',
  'Do ponto de vista fisiológico, savasana é quando o corpo processa o que aconteceu na aula. Os músculos assimilam o trabalho. O sistema nervoso parassimpático assume o controle. A frequência cardíaca desacelera, a pressão arterial cai levemente, e o estado mental se aproxima do que acontece nos primeiros estágios do sono — sem dormir.',
  'Pular o savasana para ganhar tempo é o equivalente a cozinhar uma refeição elaborada e servir antes de assar. A aula se completa no descanso, não no esforço. Quem sai da aula antes do savasana leva consigo o trabalho feito — mas não a integração. E é a integração que gera transformação duradoura.',false)+
gCard(5,'hatha-yoga','Modalidade','Hatha Yoga',
  'Hatha Yoga é a base de quase todo estilo de yoga praticado no Ocidente. As aulas são pausadas — cada postura é mantida por algumas respirações antes de mudar. É o estilo ideal para iniciantes, para quem quer desacelerar sem parar de mover, e para quem busca uma prática sustentável ao longo do tempo.',
  'A palavra hatha combina dois termos sânscritos: ha (sol) e tha (lua). A prática busca o equilíbrio entre opostos — força e suavidade, esforço e entrega, estabilidade e leveza. Não é sobre escolher entre os extremos, mas aprender a transitar entre eles com consciência.',
  'A estrutura clássica de uma aula de Hatha inclui aquecimento, sequência de posturas em pé, posturas sentadas e deitadas, e descanso final. O ritmo permite que cada postura seja sentida — não apenas executada. É nessa pausa, nessa permanência, que o corpo começa a ceder e a mente aprende a acompanhar.',
  'Hatha é frequentemente subestimado por quem quer algo "mais intenso". Mas sua aparente suavidade é enganosa: manter o corpo alinhado em uma postura simples por cinco respirações exige força, equilíbrio e atenção que nenhum treino rápido desenvolve. A lentidão do Hatha é seu poder — não sua limitação.',true)+
gCard(6,'vinyasa','Modalidade','Vinyasa Yoga',
  'Vinyasa é o estilo de yoga em que os movimentos fluem em sincronia com a respiração — você inspira entrando em uma postura, expira saindo. As aulas são dinâmicas, cardiovasculares e criam calor interno. É indicado para quem se sente agitada demais para "ficar parada", pois o movimento constante ocupa e ao mesmo tempo ensina a mente.',
  'Vinyasa significa "fluxo" — cada movimento nasce da respiração e a respiração dita o ritmo de tudo. O resultado é quase uma dança coreografada: suave quando você está respirando em consciência, caótica quando a respiração se perde. Por isso o Vinyasa ensina mais do que força ou flexibilidade — ensina a perceber quando você saiu do próprio centro.',
  'Para quem nunca praticou yoga porque "não consegue ficar quieta", o Vinyasa costuma ser a porta de entrada perfeita. Não há silêncio exigido, não há permanência desconfortável em posturas estáticas. O corpo se move, aquece, e a mente — ocupada com a sequência e a respiração — naturalmente se acalma.',
  'Com a prática, o Vinyasa revela algo inesperado: quanto mais fluido o movimento, mais profundo o silêncio interno. O praticante experiente não está "pensando menos" por esforço — está simplesmente tão presente no que o corpo faz que não sobra espaço para a lista de tarefas.',true)+
gCard(7,'yoga-restaurativo','Modalidade','Yoga Restaurativo',
  'Yoga Restaurativo é uma prática de descanso ativo. As posturas são sustentadas por almofadas, cobertores e blocos, e mantidas por vários minutos — sem esforço, sem tensão. O objetivo é restaurar o sistema nervoso: não estimular, mas permitir que o corpo reverta o estado crônico de alerta que o stress acumula.',
  'Para quem vive esgotada, a ideia de fazer yoga "mais suave ainda" pode parecer retrocesso. Na prática, é o oposto. O yoga restaurativo é difícil de um jeito muito específico: exige que você pare de fazer. E para quem passou anos em modo de produção constante, simplesmente deixar o corpo pesar — sem agenda, sem próxima tarefa — pode ser o trabalho mais desafiador da semana.',
  'As posturas restaurativas ativam o sistema nervoso parassimpático — o modo "descanso e digestão" — através de pressão suave, calor e imobilidade. Com o tempo, o sistema nervoso aprende que é seguro desacelerar. O corpo que passou meses tenso começa a reconhecer o relaxamento como estado possível, não só como exceção.',
  'É a modalidade mais indicada para períodos de burnout, esgotamento emocional, recuperação de doenças, ou qualquer momento em que adicionar mais esforço seria contraproducente. Não é a prática para quem quer "sentir que trabalhou". É a prática para quem precisa, urgentemente, aprender a parar.',true)+
gCard(8,'yoga-somatico','Modalidade','Yoga Somático',
  'Yoga Somático é uma abordagem que coloca a percepção interna do corpo no centro da prática. Somático vem do grego soma — o corpo vivido por dentro, não o corpo visto de fora. Em vez de buscar a forma correta de uma postura, o yoga somático pergunta: como você sente isso? É especialmente eficaz para liberar tensões crônicas que têm raiz emocional.',
  'A maioria das práticas corporais — incluindo estilos tradicionais de yoga — olha o corpo de fora: "alinhe o joelho, levante o braço, mantenha o quadril no lugar". O yoga somático inverte a direção: o professor guia, mas quem avalia é a sensação interna. O critério não é a aparência da postura, mas o que ela desperta.',
  'Isso muda fundamentalmente a experiência para quem carrega tensões crônicas — os ombros que nunca abaixam, o maxilar sempre contraído, o diafragma preso que encurta a respiração. Essas tensões raramente cedem com alongamento comum, porque não são musculares apenas: são padrões aprendidos, respostas do sistema nervoso a experiências passadas.',
  'A prática é lenta, investigativa e frequentemente surpreendente. Uma pessoa que nunca sentiu o próprio quadril pode descobrir, em uma sequência somática de dez minutos, uma tensão que carrega há anos sem perceber. Nomear essa tensão — sentir onde ela está, observar como ela respira, decidir se quer soltá-la — já é transformação.',true)+
gCard(9,'swasthya','Modalidade','SwáSthya Yoga',
  'SwáSthya é uma tradição de yoga com raiz genuinamente brasileira, desenvolvida pelo mestre Caio Miranda. O nome vem do sânscrito e significa "aquele que está estabelecido em si mesmo". Combina postura, respiração, relaxamento e autoconhecimento de forma estruturada e terapêutica, com ênfase no equilíbrio integral — não apenas físico.',
  'Em um mercado saturado de estilos importados sem adaptação, o SwáSthya se destaca por ter sido desenvolvido e refinado dentro do contexto cultural brasileiro. Não é uma transposição literal de textos antigos para uma realidade diferente — é uma tradição viva, construída ao longo de décadas de ensino no Brasil.',
  'A estrutura de uma aula de SwáSthya é completa: trabalha o corpo de forma progressiva, integra a respiração em cada movimento, inclui relaxamento profundo e oferece espaço para introspecção. O praticante não sai apenas com o corpo alongado — sai com uma sensação de inteireza que vai além da musculatura.',
  'Para quem busca uma prática com profundidade filosófica sem precisar adotar um sistema de crenças alheio, o SwáSthya oferece exatamente isso: uma visão de mundo que valoriza o equilíbrio, a autopercepção e a relação consciente com o próprio corpo — sem dogma, sem exigência de conversão.',true)+
gCard(10,'acroyoga','Modalidade','Acroyoga',
  'Acroyoga é uma prática que combina yoga, acrobacia e trabalho em dupla. Uma pessoa serve de base (sustentando o peso com os pés e as mãos), a outra é a voadora (equilibrada no ar). O que diferencia o acroyoga de acrobacia comum é o que acontece na relação: a prática exige e desenvolve confiança, presença e comunicação.',
  'Voar parece o elemento mais impressionante do acroyoga. Mas quem pratica com seriedade sabe que o aprendizado mais profundo acontece na base — na pessoa que sustenta. Sustentar um peso no ar, com o corpo alinhado e a respiração estável, enquanto mantém comunicação constante com quem está em cima, é um exercício de presença total.',
  'A dimensão relacional do acroyoga é o que o separa de qualquer outra prática corporal. Para voar com leveza, é preciso confiar na base. Para sustentar com segurança, é preciso sentir o que o voador precisa antes que ele peça. Essa dança de confiança e ajuste mútuo ensina — de forma visceral — que dependência e força não são opostos.',
  'Nas aulas de acroyoga da Gi, a prática acontece em ambiente de segurança e progressão gradual. Ninguém voa no primeiro dia. O que acontece no primeiro dia é aprender a comunicar, a pedir ajuda, a ceder o peso — habilidades que a vida cotidiana raramente oferece oportunidade de praticar de forma tão concreta e imediata.',true)+
gCard(11,'flexibilidade','Mito','Flexibilidade no Yoga',
  'Flexibilidade não é pré-requisito para o yoga — é consequência. Quem começa o yoga sem flexibilidade tem exatamente o yoga que precisa: adaptado ao corpo que tem hoje. Com a prática regular, o tecido conjuntivo cede gradualmente. Forçar o processo além do que o corpo oferece não acelera — machuca.',
  'A imagem do yoga que circula nas redes sociais seleciona, por natureza, o que é visualmente impressionante. Corpos em posturas extremas são fotogênicos. Corpos rígidos fazendo o melhor que conseguem não rendem tanto engajamento. Esse filtro cria a falsa impressão de que yoga é para pessoas já flexíveis — quando na realidade é o oposto.',
  'Do ponto de vista anatômico, a flexibilidade é limitada por múltiplos fatores: comprimento muscular, elasticidade dos tendões e ligamentos, formato das articulações, temperatura corporal e, não menos importante, o estado do sistema nervoso. Um músculo tenso não é apenas um músculo curto — frequentemente é um músculo que recebeu a mensagem de "fique alerta".',
  'A boa notícia: o corpo humano adulto saudável tem muito mais plasticidade do que a maioria das pessoas acredita. Após algumas semanas de prática regular e consistente, quase todo iniciante percebe mudanças — não porque o músculo cresceu, mas porque o sistema nervoso aprendeu que é seguro ceder.',false)+
gCard(12,'yoga-espiritualidade','Mito','Yoga e Espiritualidade',
  'Yoga tem origens filosóficas e espirituais profundas na tradição indiana. Mas praticar yoga não exige nenhuma crença religiosa, nenhuma filiação espiritual e nenhuma mudança de cosmovisão. Os benefícios físicos e mentais do yoga — redução de ansiedade, melhora do sono, alívio de dores — estão disponíveis para qualquer pessoa, independentemente do que acredita.',
  'A confusão entre yoga e religião tem duas origens. A primeira é histórica: yoga nasceu dentro de uma tradição filosófica indiana que inclui conceitos espirituais. A segunda é mercadológica: parte da indústria do bem-estar no Ocidente adotou uma estética "espiritual" que mistura referências de várias tradições.',
  'Na prática, o yoga funciona pelos mesmos mecanismos independentemente de quem o pratica. A respiração consciente ativa o nervo vago independentemente da fé do praticante. O alongamento libera tensão muscular independentemente da cosmologia de quem está no tapete.',
  'Para quem tem reservas religiosas em relação ao yoga: o que acontece em uma aula de yoga laica é simplesmente movimento, respiração e atenção ao corpo. Não há oração, não há afirmação de fé, não há doutrina. Para quem quer integrar a dimensão espiritual: há estilos e professores que oferecem exatamente isso.',false)+
gCard(13,'yoga-meditacao','Mito','Yoga e Meditação',
  'Yoga e meditação são práticas distintas que frequentemente andam juntas. A meditação é uma prática predominantemente mental — observar os pensamentos sem se envolver com eles. O yoga é uma prática corporal que usa movimento e respiração como porta de entrada para esse mesmo estado de quietude interior.',
  'Para muitas pessoas, especialmente aquelas que tentaram meditar e sentiram que "não conseguem parar de pensar", o yoga oferece um caminho alternativo. O corpo em movimento é mais fácil de ocupar do que a mente sentada em silêncio. A atenção que a meditação tradicional pede da mente, o yoga pede do corpo — e a mente acompanha, quase sem perceber.',
  'No final de uma boa aula de yoga, o estado que emerge — calmo, presente, sem urgência — é muito próximo do que se busca na meditação. Não por acidente: ambas as práticas trabalham o mesmo sistema nervoso, pelos mesmos mecanismos de regulação, apenas por caminhos diferentes.',
  'Uma distinção prática: quem tem dificuldade de se sentar e "não fazer nada" geralmente encontra no yoga um ponto de entrada mais acessível para os benefícios que a meditação promete. E, com o tempo, muitos praticantes de yoga descobrem que a meditação — antes impossível — se tornou natural.',false)+
gCard(14,'yoga-online-ao-vivo','Benefício','Yoga ao Vivo Online',
  'Yoga ao vivo online é a prática de yoga conduzida em tempo real por professor, com alunos participando por videochamada. A diferença fundamental em relação a aulas gravadas é que o professor vê os alunos, corrige a postura em tempo real e cria presença genuína — tornando a experiência comparável a uma aula presencial, sem o deslocamento.',
  'O maior ganho do yoga ao vivo online é a correção em tempo real. Em uma aula gravada, o praticante executa as posturas sem qualquer retorno — pode estar errando o alinhamento semana após semana, criando hábitos posturais incorretos, sem nunca saber. Em uma aula ao vivo, a professora vê, identifica e ajusta. O aprendizado é incomparavelmente mais rápido e mais seguro.',
  'A dimensão relacional também se mantém: a professora sabe seus nomes, percebe quando você faltou, nota quando algo mudou no seu corpo ou no seu humor. Isso não acontece com uma biblioteca de vídeos por mais completa que seja. E é exatamente essa presença — saber que alguém te vê e te espera — que transforma uma intenção em hábito.',
  'Do ponto de vista logístico, o yoga online ao vivo elimina as barreiras que geralmente interrompem a consistência: não há deslocamento, não há trânsito, não há estacionamento, não há horário de chegada. O tempo salvo em logística, para uma aula 4 vezes por semana, representa horas recuperadas por mês.',true)+
gCard(15,'yoga-ansiedade-glossario','Benefício','Yoga para Ansiedade',
  'O yoga atua diretamente no sistema nervoso autônomo, que regula a resposta de estresse do corpo. Através do pranayama e de posturas que estimulam o nervo vago, o yoga ativa o sistema nervoso parassimpático, reduz o cortisol e diminui a frequência cardíaca. Para quem vive em estado crônico de alerta, a prática regular oferece uma via de saída que não depende de força de vontade.',
  'A ansiedade, no nível fisiológico, é o sistema nervoso preso no modo "luta ou fuga" — o mesmo mecanismo que salvava nossos ancestrais de predadores, ativado de forma crônica por emails, prazos e responsabilidades que nunca terminam. O corpo não distingue entre "tigre" e "reunião importante": libera cortisol para ambos.',
  'O yoga interrompe esse ciclo de fora para dentro. Uma expiração longa e controlada — mais longa do que a inspiração — envia ao sistema nervoso um sinal inequívoco: o perigo passou. O coração desacelera. O diafragma descende. Os ombros, sem que você mande, descem. Isso não é placebo — é o nervo vago respondendo a um estímulo que ele foi biologicamente programado para reconhecer como seguro.',
  'A diferença entre "fazer yoga uma vez" e "praticar yoga regularmente" é a diferença entre apagar um incêndio e instalar um sistema de prevenção. A prática consistente recalibra o sistema nervoso — seu ponto de equilíbrio muda. O estado que antes exigia esforço para alcançar começa a ser o estado padrão.',true)+
gCard(16,'yoga-insonia-glossario','Benefício','Yoga para Insônia',
  'O yoga melhora o sono por dois caminhos complementares: regula os ciclos de cortisol ao longo do dia e, nas horas que precedem o sono, ativa o sistema nervoso parassimpático. A maioria das alunas relata melhora perceptível no sono nas primeiras duas semanas de prática regular — antes mesmo de sentir mudanças na flexibilidade ou na força.',
  'A insônia mais comum não é a incapacidade de adormecer — é a incapacidade de desligar. A mente continua processando o dia, planejando amanhã, revisando conversas, mesmo depois que o corpo deitou. Isso acontece porque o sistema nervoso nunca recebeu o sinal claro de que o dia terminou.',
  'O yoga oferece esse sinal de múltiplas formas. A prática regular regula os picos de cortisol ao longo do dia. Posturas específicas, especialmente as inversões suaves e as restaurativas, estimulam a produção de melatonina e preparam o sistema nervoso para o descanso.',
  'Há também um efeito cumulativo: o praticante que faz yoga regularmente desenvolve uma relação diferente com o próprio corpo. Aprende a reconhecer os sinais de tensão antes que se acumulem. Aprende a respirar quando a mente acelera. Aprende que é possível parar — e que parar não é perigoso.',true)+
gCard(17,'yoga-lombar-glossario','Benefício','Yoga para Dor Lombar',
  'O yoga atua na dor lombar crônica por múltiplos caminhos: fortalece a musculatura profunda do core, melhora a mobilidade dos quadris e isquiotibiais (que quando encurtados aumentam a pressão lombar), e corrige padrões posturais inadequados. A correção de postura em tempo real por um professor é especialmente importante — fazer errado pode piorar a dor.',
  'A dor lombar crônica raramente tem uma causa única. É quase sempre o resultado de uma combinação: músculos enfraquecidos que sobrecarregam as vértebras, tecidos encurtados que distorcem o alinhamento, e padrões de movimento inadequados aprendidos ao longo de anos. O yoga endereça todas essas camadas simultaneamente.',
  'O core — frequentemente traduzido como "abdômen" — é, em termos anatômicos, muito mais abrangente: inclui o diafragma, o assoalho pélvico, os músculos profundos das costas e do abdômen. O yoga trabalha todo esse sistema de sustentação como unidade. Quando o core funciona corretamente, a coluna não carrega sozinha o peso do corpo.',
  'Uma advertência importante: yoga para dor lombar exige orientação qualificada. Algumas posturas que beneficiam a maioria das pessoas podem ser contraindicadas para condições específicas. A presença de uma professora que vê o aluno e adapta a prática — como ocorre nas aulas ao vivo — é a diferença entre a prática como tratamento e a prática como risco.',true)+
gCard(18,'yin-yoga','Modalidade','Yin Yoga',
  'Yin Yoga é uma prática lenta em que cada postura é mantida por três a dez minutos, com o corpo completamente relaxado. O alvo não são os músculos, mas os tecidos conectivos profundos: fáscia, ligamentos e cápsulas articulares. É complementar às práticas mais ativas e particularmente eficaz para mobilidade, alívio de dores crônicas e regulação do sistema nervoso.',
  'A distinção entre Yin e os estilos mais dinâmicos de yoga é fundamental para entender por que os dois são necessários. O yoga ativo (Hatha, Vinyasa) trabalha o tecido muscular — que responde bem ao esforço repetido e ao aquecimento. O tecido conjuntivo profundo é diferente: ele é denso, pouco vascularizado e não cede sob esforço. Ele cede sob pressão suave e duradoura.',
  'Para quem tem mais de 40 anos, o Yin Yoga resolve um problema que o treino convencional ignora: a perda gradual de mobilidade que acontece não nos músculos, mas nas articulações. O quadril que foi ficando rígido, o pescoço que não gira mais como antes, os joelhos que travam — essas limitações geralmente estão na fáscia e nos ligamentos, não no músculo.',
  'A experiência de uma aula de Yin é diferente de qualquer outra prática corporal. Há desconforto — não dor, mas uma sensação intensa de pressão que exige permanecer. Esse permanecer, respirando conscientemente por vários minutos em uma postura que o corpo quer abandonar, é simultaneamente um treino de tolerância e uma conversa com os padrões de tensão acumulados.',true)+
gCard(19,'yoga-nidra-glossario','Modalidade','Yoga Nidra',
  'Yoga Nidra é uma prática de relaxamento guiado feita deitada, completamente imóvel. O praticante é conduzido por roteiro verbal através de camadas progressivas de consciência — do corpo para a mente, da mente para o estado de quietude profunda. O resultado é um estado entre vigília e sono onde o sistema nervoso se restaura de forma que o sono comum nem sempre alcança.',
  'O nome significa "sono yóguico" — mas a distinção é precisa: você não dorme. Fica no limiar. Esse estado, conhecido na neurociência como hipnagogia, é caracterizado por ondas alfa e theta no cérebro — o mesmo padrão de um descanso profundo, mas com consciência ativa. É nesse limiar que o sistema nervoso consegue liberar padrões de tensão que no estado de vigília não consegue alcançar.',
  'Uma sessão de 30 minutos de Yoga Nidra é frequentemente descrita como equivalente a 2-3 horas de sono no que diz respeito à recuperação do sistema nervoso. Para pessoas com insônia, ansiedade ou esgotamento crônico, essa é uma das ferramentas mais eficazes disponíveis — porque não exige esforço, não exige postura, não exige nada além de deitar e seguir a voz da professora.',
  'A prática usa uma sequência de atenção que percorre o corpo sistematicamente — uma parte de cada vez — criando o que os neurocientistas chamam de "varredura corporal". Esse processo ativa o córtex sensorial, ocupa a mente de forma suave e redireciona a atenção do pensamento ruminativo para a sensação presente.',true)+
gCard(20,'neuroyoga-glossario','Modalidade','Neuroyoga',
  'Neuroyoga é uma abordagem emergente que integra explicitamente os conhecimentos da neurociência à prática do yoga. Em vez de apenas descrever os efeitos pela tradição, o Neuroyoga explica por que o yoga funciona — como o cérebro responde ao movimento, à respiração e à atenção — e usa esse entendimento para desenhar práticas mais precisas e intencionais.',
  'O que separa o Neuroyoga do yoga convencional não é o tapete, nem as posturas, nem a respiração. É o mapa. O professor de Neuroyoga entende os mecanismos: sabe que a expiração longa ativa o nervo vago porque conhece a anatomia da resposta parassimpática. Esse mapa muda a precisão com que a prática é conduzida.',
  'Para a aluna, a diferença é menos técnica e mais experiencial: as instruções fazem sentido. Em vez de "relaxe o diafragma porque o prana flui melhor", o professor de Neuroyoga diz "expire completamente porque isso ativa o freio do seu sistema de alerta". Em vez de "abra o coração para a gratidão", diz "mantenha essa postura por mais três respirações porque a tolerância ao desconforto se aprende exatamente assim".',
  'O Neuroyoga ainda é um campo jovem, mas cresce rapidamente — especialmente no contexto de saúde mental, burnout e reabilitação. A combinação de uma prática milenar com o vocabulário e a legitimidade da neurociência contemporânea cria uma ponte para quem desconfia do misticismo, mas reconhece que o corpo e a mente precisam, urgentemente, de atenção.',true)+
gCard(21,'yoga-hiit','Modalidade','Yoga HIIT',
  'Yoga HIIT combina posturas de yoga com intervalos de alta intensidade — alternando blocos de esforço cardiovascular com momentos de recuperação ativa dentro da estrutura do yoga. Oferece condicionamento físico, força e resistência sem abandonar a atenção ao corpo e a consciência da respiração que definem a prática do yoga.',
  'O High Intensity Interval Training (HIIT) convencional é eficaz para condicionamento cardiovascular, mas costuma ignorar o que acontece por dentro — a qualidade da respiração, o alinhamento, a percepção de limites. O Yoga HIIT mantém a intensidade e adiciona esse componente: você trabalha forte, mas com atenção.',
  'É uma modalidade especialmente relevante para quem já tem base em yoga e quer aumentar a intensidade sem migrar para uma academia. Ou para quem vem de um histórico de treinos intensos e quer manter o condicionamento enquanto desenvolve mobilidade, consciência corporal e gestão do sistema nervoso.',
  'Uma distinção importante: Yoga HIIT não é yoga acelerado, nem é HIIT com tapete. É uma prática com identidade própria — que exige que a professora conheça profundamente os dois universos para integrar sem perder o que é essencial em cada um. A intensidade serve ao corpo, não ao ego.',true)+
gCard(22,'yoga-menopausa-glossario','Benefício','Yoga para Menopausa',
  'O yoga tem evidências específicas para o manejo dos sintomas da menopausa: ondas de calor, insônia, oscilações de humor, rigidez articular e ansiedade. Técnicas de respiração e posturas específicas atuam diretamente nas alterações do sistema nervoso autônomo que caracterizam essa fase, tornando o yoga uma das abordagens complementares mais embasadas para mulheres na perimenopausa e menopausa.',
  'A menopausa não é uma doença — é uma transição fisiológica com impacto real no sistema nervoso. A queda de estrogênio altera a regulação do sistema nervoso autônomo: o termostato interno fica instável (ondas de calor), o sono se fragmenta, a resposta ao estresse se amplifica. O yoga não repõe hormônios. Mas atua diretamente nos sistemas que esses hormônios regulavam.',
  'O pranayama resfria o sistema nervoso de formas que a medicina integrativa tem documentado em estudos de ondas de calor. Posturas invertidas suaves regulam o sistema circulatório e melhoram o sono. O trabalho no assoalho pélvico, que o yoga inclui naturalmente, preserva função que tende a diminuir após a menopausa.',
  'Há também o que se poderia chamar de efeito de identidade: muitas mulheres chegam ao yoga depois dos 45 carregando a sensação de que o corpo não obedece mais. A prática que encontram no tapete não é de controle, mas de diálogo. O corpo que está em transição hormonal não é um corpo em falha — é um corpo que mudou e pede uma nova linguagem. O yoga oferece essa linguagem, sem pressa e sem julgamento.',true)+
`
    </div>
  </div>
</section>`;

const contatoFooterHtml = `
<!-- CONTATO -->
<section id="contato" class="section" aria-labelledby="contato-heading">
  <div class="container">
    <span class="section-label">Fale com a Gi</span>
    <h2 id="contato-heading" class="section-heading">Fale com a Gi</h2>
    <p class="section-intro">Ainda tem dúvidas? A Gi responde pessoalmente.</p>
    <div class="contato__inner">
      <div>
        <div class="contato__links">
          <a href="https://wa.me/5511987530304" class="contato__link" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensagem pelo WhatsApp">
            <span class="contato__link-icon" aria-hidden="true">📱</span>
            <div class="contato__link-text"><strong>WhatsApp</strong><span>+55 11 98753-0304 · a forma mais rápida</span></div>
          </a>
          <a href="https://instagram.com/giovanaborba" class="contato__link" target="_blank" rel="noopener noreferrer" aria-label="Seguir no Instagram">
            <span class="contato__link-icon" aria-hidden="true">📸</span>
            <div class="contato__link-text"><strong>Instagram</strong><span>@giovanaborba · conteúdo semanal sobre identidade e resgate</span></div>
          </a>
          <a href="https://www.youtube.com/user/giovanaborba1/" class="contato__link" target="_blank" rel="noopener noreferrer" aria-label="Canal no YouTube">
            <span class="contato__link-icon" aria-hidden="true">▶️</span>
            <div class="contato__link-text"><strong>YouTube</strong><span>youtube.com/user/giovanaborba1 · aulas e vivências gratuitas</span></div>
          </a>
        </div>
      </div>
      <div>
        <form class="contact-form" id="contact-form" novalidate aria-label="Formulário de contato">
          <h3 style="font-family:var(--font-heading);font-size:1.15rem;margin-bottom:var(--space-3);color:var(--color-text);">Ou envie uma mensagem aqui:</h3>
          <div class="form-group">
            <label class="form-label" for="contact-name">Seu nome <span aria-hidden="true">*</span></label>
            <input class="form-input" type="text" id="contact-name" name="name" placeholder="Como a Gi pode te chamar?" required autocomplete="given-name" aria-required="true">
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-phone">Seu WhatsApp <span aria-hidden="true">*</span></label>
            <input class="form-input" type="tel" id="contact-phone" name="phone" placeholder="(11) 9 9999-9999" required autocomplete="tel" aria-required="true">
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-message">Mensagem <span style="font-weight:400;color:var(--color-text-muted);">(opcional)</span></label>
            <textarea class="form-textarea" id="contact-message" name="message" placeholder="Conta um pouco sobre você ou tire uma dúvida..." aria-required="false"></textarea>
          </div>
          <button type="submit" class="btn btn--primary form-submit" aria-label="Enviar mensagem via WhatsApp">Quero saber mais sobre as aulas →</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer" role="contentinfo" aria-label="Rodapé do site">
  <div class="container">
    <div class="footer__inner">
      <div>
        <p class="footer__brand-name">Giovana Borba</p>
        <p class="footer__brand-tagline">Yoga para Resgate de Identidade</p>
        <p class="footer__credentials">Professora de Hatha Yoga · Vinyasa · SwáSthya · Yoga Somático · Yoga Restaurativo · Acroyoga</p>
        <p class="footer__creator">Criadora do Inspire Trip | Brasil</p>
        <div class="footer__social" aria-label="Redes sociais">
          <a href="https://wa.me/5511987530304" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">📱</a>
          <a href="https://instagram.com/giovanaborba" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
          <a href="https://www.youtube.com/user/giovanaborba1/" class="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶️</a>
        </div>
      </div>
      <div>
        <nav class="footer__nav" aria-label="Links legais e de navegação">
          <a href="/politica-de-privacidade">Política de Privacidade</a>
          <a href="/termos-de-uso">Termos de Uso</a>
          <a href="/politica-de-privacidade#lgpd">LGPD — Proteção de Dados</a>
          <a href="#sobre">Sobre a Gi</a>
          <a href="#modalidades">Modalidades</a>
          <a href="#horarios">Horários e Valores</a>
          <a href="#faq">Perguntas Frequentes</a>
        </nav>
      </div>
    </div>
    <p class="footer__legal">Este site respeita a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). As aulas são realizadas online via Zoom. Seus dados de contato são utilizados exclusivamente para agendamento e comunicação com a professora, e nunca serão compartilhados com terceiros sem seu consentimento explícito.</p>
    <p class="footer__copyright">© 2026 Giovana Borba. Todos os direitos reservados.</p>
  </div>
</footer>`;

// Also inject FAQPage JSON-LD before </head>
const faqSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {"@type":"Question","name":"O que é yoga e para que serve?","acceptedAnswer":{"@type":"Answer","text":"Yoga é uma prática que combina posturas físicas, respiração consciente e atenção ao corpo. Serve para reduzir ansiedade, melhorar o sono, aliviar dores crônicas e recuperar a sensação de equilíbrio. Não é religião, não exige flexibilidade e não depende de nenhuma crença espiritual — funciona por biologia, não por misticismo."}},
      {"@type":"Question","name":"Posso fazer yoga sem ser flexível?","acceptedAnswer":{"@type":"Answer","text":"Sim. Flexibilidade não é pré-requisito para o yoga — é consequência. Quem começa sem flexibilidade tem exatamente o yoga que precisa: adaptado ao corpo que tem hoje."}},
      {"@type":"Question","name":"Yoga ajuda na ansiedade?","acceptedAnswer":{"@type":"Answer","text":"Sim, e a evidência é robusta. Estudos documentam redução significativa de sintomas de ansiedade em praticantes regulares de yoga. O mecanismo é fisiológico: técnicas de respiração ativam o nervo vago, reduzem o cortisol e desaceleram o sistema nervoso autônomo."}},
      {"@type":"Question","name":"Yoga melhora a insônia?","acceptedAnswer":{"@type":"Answer","text":"Sim. O yoga melhora o sono por dois caminhos: regula os picos de cortisol ao longo do dia e ativa o sistema nervoso parassimpático antes de dormir. A maioria das praticantes relata melhora perceptível nas primeiras duas semanas."}},
      {"@type":"Question","name":"Yoga online ao vivo funciona tanto quanto o presencial?","acceptedAnswer":{"@type":"Answer","text":"Para a maioria das pessoas, sim — desde que seja ao vivo com professor que vê os alunos. A correção verbal e visual, a presença e a adaptação em tempo real se mantêm integralmente online."}},
      {"@type":"Question","name":"É tarde para começar yoga aos 40, 50 ou 60 anos?","acceptedAnswer":{"@type":"Answer","text":"Não. O yoga é uma das práticas com menor barreira de entrada para adultos mais velhos. Não há limite de idade para começar, e os benefícios são proporcionalmente maiores para quem começa depois dos 40."}},
      {"@type":"Question","name":"Yoga é religião?","acceptedAnswer":{"@type":"Answer","text":"Não. Yoga tem origens filosóficas nas tradições indianas, mas praticar yoga não exige nenhuma crença religiosa, filiação espiritual ou mudança de cosmovisão. Os benefícios físicos e mentais estão disponíveis para qualquer pessoa."}},
      {"@type":"Question","name":"Yoga para menopausa alivia os calores?","acceptedAnswer":{"@type":"Answer","text":"Sim. Estudos clínicos documentam redução significativa da frequência e intensidade das ondas de calor em mulheres que praticam yoga regularmente — particularmente técnicas de respiração que ativam o sistema nervoso parassimpático."}},
      {"@type":"Question","name":"Qual tipo de yoga é melhor para iniciantes?","acceptedAnswer":{"@type":"Answer","text":"Para a maioria dos adultos que começam do zero, Hatha Yoga é o ponto de entrada mais recomendado: ritmo pausado, posturas mantidas por algumas respirações, espaço para aprender o alinhamento com segurança."}},
      {"@type":"Question","name":"Em quanto tempo o yoga produz resultados?","acceptedAnswer":{"@type":"Answer","text":"Os primeiros resultados são rápidos: melhora do sono e redução de ansiedade costumam aparecer nas primeiras duas semanas de prática consistente."}}
    ]
  }
  </script>`;

let html = fs.readFileSync(path, 'utf8');
html = html.replace('<!-- GLOSSARIO_PLACEHOLDER -->', glossarioHtml);
html = html.replace('<!-- CONTATO_PLACEHOLDER -->\n<!-- FOOTER_PLACEHOLDER -->', contatoFooterHtml);
html = html.replace('</head>', faqSchema + '\n</head>');
fs.writeFileSync(path, html, 'utf8');
console.log('All sections injected. Final size:', fs.statSync(path).size);
