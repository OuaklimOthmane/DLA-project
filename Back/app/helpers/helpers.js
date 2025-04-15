const mongoose = require('mongoose')
exports.emailUsername = (emailAddress) => {
  return emailAddress.match(/^(.+)@/)[1]
}

exports.is_null = (value) => {
  return value === null || value === undefined || value === '' || value === false;
}
/**
 * Check if is ObjectId
 * @param string
 * @returns {boolean}
 */
exports.isObjectId = (string) => mongoose.Types.ObjectId.isValid(string)

exports.ADMIN_LEVEL = 1
exports.SELLER_LEVEL = 2
exports.CALLER_LEVEL = 3
exports.MODERATOR_LEVEL = 4
exports.BROEKR_LEVEL = 5

exports.questions = {
  1: {
    text: "Bonjour MR/MME LEAD, je suis CALLER de COMPANY_NAME, je vous appelle suite à votre demande de renseignement que vous avez effectué sur notre site concernant l'une de notre formation. Vous avez deux petites minutes à m’accorder afin de vous parler de notre programme de formation?",
    step: 1,
    current: false,
    last_current: false,
    yes: {
      text: 'Oui',
      next: 2,
    },
    no: {
      text: 'Non',
      next: 13,
    },
  },
  2: {
    text: 'Connaissez-vous notre centre de formation COMPANY_NAME? Nous sommes un centre de formation spécialisé dans la formation professionnelle agrée par l’état, toutes nos formations sont certifiantes par des organismes reconnus en français et en europe.',
    step: 2,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 3,
    },
    no: {
      text: '',
    },
  },
  3: {
    text: "J’ai vu dans la demande que vous avez effectuée sur notre site que vous êtes intéressé par l'une de nos formations, est ce que c’est bien le cas? Sachez MR/MME LEAD que nous avons plusieurs niveaux à vous proposer pour cette formation, et avant de commencer les cours nous allons vous envoyer un test d’évaluation pour adapter la formation à votre niveau et vous permettre d’améliorer vos connaissances et vous préparer à la certification grâce à un accompagnement personnalisé par un formateur expérimenté en la matière.",
    step: 3,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 4,
    },
    no: {
      text: '',
    },
  },
  4: {
    text: 'Connaissez vous le programme CPF?',
    step: 4,
    current: false,
    last_current: false,
    yes: {
      text: 'Oui',
      next: 6,
    },
    no: {
      text: 'Non',
      next: 5,
    },
  },
  5: {
    text: 'C’est votre Compte Professionnel de Formation auquel vous avez cotisé en tant que salarié depuis des années. C’est la raison pour laquelle je vous appelle afin de vous faire profiter de vos droits à la formation professionnelle qui est prise en charge dans 100% des cas dans son intégralité par l’État.',
    step: 4,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 6,
    },
    no: {
      text: '',
    },
  },
  6: {
    text: 'Un plan anti-crise a été défini: l’État aide les salariés, les auto-entrepreneurs ainsi que les chômeurs à bénéficier d’une formation afin de rester compétitif dans leur métier et d’être toujours attractif sur le marché de l’emploi. Avant toute chose, souhaitez-vous savoir si oui ou non vous bénéficiez de ces droits ?',
    step: 4,
    current: false,
    last_current: false,
    yes: {
      text: 'Oui',
      next: 7,
    },
    no: {
      text: 'Non',
      next: 13,
    },
  },
  7: {
    text: 'Très bien, Avez-vous la possibilité d\'accéder au site https://www.moncompteformation.gouv.fr ?',
    step: 5,
    current: false,
    last_current: false,
    yes: {
      text: 'Oui',
      next: 9,
    },
    no: {
      text: 'Non',
      next: 8,
    },
  },
  8: {
    text: 'Auto-Financement',
    step: 5,
    current: false,
    last_current: false,
    yes: {
      text: 'Oui',
      next: 9,
    },
    no: {
      text: 'Non',
      next: 13,
    },
  },
  9: {
    text: 'Proposition de formation',
    products_exist: true,
    step: 6,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 10,
    },
    no: {
      text: 'Pas intéressé',
      next: 13,
    },
  },
  10: {
    text: '“Afin d’aller plus loin et de valider votre formation, je vais vous envoyer un mail avec un lien pour vous inscrire à la formation que vous avez choisi. Est-ce que vous l\'avez reçu ?”',
    folder_exist: true,
    step: 7,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 11,
    },
    no: {
      text: '',
    },
  },
  11: {
    text: "Attente de la validation par l'admin",
    step: 8,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 12,
    },
    no: {
      text: '',
    },
  },
  12: {
    text: 'Signature electronique du contrat',
    step: 9,
    current: false,
    last_current: false,
    yes: {
      text: 'Suivant',
      next: 13,
    },
    no: {
      text: '',
    },
  },
  13: {
    text: 'Merci MR/MME LEAD pour votre confiance, nous allons vous contacter un jour avant le début de la formation afin de vous communiquer vos accès à la formation, vous serez aussi contacté par notre formateur afin de planifier les heures de coaching. Est-ce que tout est claire pour vous MR/MME LEAD? avez-vous des questions ?',
    step: 13,
    current: false,
    last_current: false,
    yes: {
      text: '',
    },
    no: {
      text: "Fin d'appel",
    },
  },
}

/**
 * Centos to Dollar
 * @param num
 * @returns {num}
 */
exports.centsToCurrency = (cents) => {
  return cents / 100
}

/**
 * Currency To Cents
 * @param num
 * @returns {num}
 */
exports.currencyToCents = (num) => {
  return num * 100
}

exports.toLocaleString = (amount, type = 'fr-FR', currency = 'EUR') => {
  return  amount.toLocaleString(type, {
    style: 'currency',
    currency,
  })
}

exports.DOCUSIGN_PATH =
  process.env.NODE_ENV === 'development'
    ? process.env.DOCUSIGN_DEV_ENDPOINT +
      '/restapi/v2.1/accounts/' +
      process.env.DOCUSIGN_ACCOUNT_ID
    : process.env.DOCUSIGN_DEV_ENDPOINT +
      '/restapi/v2.1/accounts/' +
      process.env.DOCUSIGN_ACCOUNT_ID

exports.isProduction = process.env.NODE_ENV !== 'development'

exports.ObjectIdIsEquals = (obj1, obj2) => {
  return obj1.equals(obj2)
}
