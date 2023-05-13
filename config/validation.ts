import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});
