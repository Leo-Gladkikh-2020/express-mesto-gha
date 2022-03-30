const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => (card ? res.send(card) : res.status(404).send({ message: 'Карточка не найдена' })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => (card ? res.send(card) : res.status(404).send({ message: 'Карточка не найдена' })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => (card ? res.send(card) : res.status(404).send({ message: 'Карточка не найдена' })))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Неверный id карточки' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
