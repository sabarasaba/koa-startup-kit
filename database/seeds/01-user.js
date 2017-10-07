exports.seed = (knex) => {
  return knex('user').del()
    .then(() => {
      return knex('user').insert([
        {
          id: 1,
          email: 'rivasign@gmail.com',
          firstName: 'Ignacio',
          lastName: 'Rivas'
        }
      ])
    })
}
