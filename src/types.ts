export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  loja: string;
  empresa: 'PneuBras - Vendas' | 'PneuBras - Administrativo' | 'PneuBras - Matriz' | 'PneuDrive - Serviços';
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
  inativoAte?: string; // Scheduled inactivation
}

export interface Noticia {
  id: string;
  titulo: string;
  descricao: string;
  linkOriginal: string;
  imageUrl: string;
  dataCriacao: string;
}

export interface InspecaoForm {
  id: string;
  unidade: string;
  inspetor: string;
  data: string;
  respostas: {
    [perguntaId: number]: {
      status: 'Conforme' | 'Não Conforme' | 'Outros';
      observacoes: string;
      fotos: string[]; // Base64 or object URLs
    };
  };
  enviadoEmail: boolean;
  enviadoGDrive: boolean;
  dataCriacao: string;
}

export interface ConformidadeForm {
  id: string;
  unidade: string;
  auditor: string;
  data: string;
  respostas: {
    [perguntaId: number]: {
      status: 'Conforme' | 'Não Conforme' | 'Outros';
      referenciaLegal: string;
      fotos: string[]; // Base64 or object URLs
    };
  };
  enviadoEmail: boolean;
  enviadoGDrive: boolean;
  dataCriacao: string;
}

export interface PilulaTreinamento {
  id: string;
  titulo: string;
  descricao: string;
  videoUrl: string; // YouTube or simple URL
  quiz: {
    pergunta: string;
    opcoes: string[];
    respostaCorreta: number; // Index
  };
  dataInicio: string;
  dataFim: string;
}

export interface QuizRespostum {
  id: string;
  pilulaId: string;
  colaboradorEmail: string;
  colaboradorNome: string;
  assistiuVideo: boolean;
  respondeuQuiz: boolean;
  acertou: boolean;
  dataResposta: string;
  status: 'Concluido' | 'Pendente' | 'Expirado';
}

export interface AppConfig {
  pbiDashboardUrl: string;
  lookerStudioUrl: string;
  gdriveFormsFolderUrl: string;
  gdrivePhotosFolderUrl: string;
}
