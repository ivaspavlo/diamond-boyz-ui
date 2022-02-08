export const FooterMenuItems = [
  {
    title: 'Marketplace',
    buttons: [
      { name: 'All NFTs', href: '/marketplace', type: 'internal' }
    ]
  }, {
    title: 'Tickets',
    buttons: [
      { name: 'Tickets', href: '/events', type: 'internal' },
      { name: 'Buy Ticket', href: '/events/1', type: 'internal' },
      // { name: 'Buy Merch', href: ''}
    ]
  }, {
    title: 'My Profile',
    buttons: [
      { name: 'Collections', href: '/profile/collections', type: 'internal' },
      { name: 'Sell', href: '/profile/sell', type: 'internal' },
      { name: 'Tickets & Merchendise', href: '/profile/tickets', type: 'internal'}
    ]
  }, {
    title: 'Support',
    buttons: [
      { name: 'All Contacts', href: '/support', type: 'internal'},
      { name: 'Whitepaper', href: 'https://dbzcoin.com/whitepaper', type: 'external'}
    ]
  }
];
