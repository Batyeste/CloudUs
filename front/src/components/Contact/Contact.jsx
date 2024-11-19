import React from 'react';
import Card from '../Card/Card'; // Assurez-vous que le chemin du fichier Card est correct.

export default function Contact() {
  const teamMembers = [
    {
      pretitle: 'Développeur Backend',
      title: 'Yohann Aharh',
      description: 'Yohann travaille sur le backend du projet, gérant les bases de données et les API pour assurer une communication fluide entre le client et le serveur.',
      action: 'Voir GitHub',
      position: 'start',
      link: 'https://github.com/Yohannkp',
    },
    {
      pretitle: 'Développeur Frontend',
      title: 'Lyiam Rousseau',
      description: 'Lyiam travaille dans la création de l’interface administrateur, avec une attention portée à l’expérience utilisateur et à la réactivité des sites.',
      action: 'Voir GitHub',
      position: 'center',
      link: 'https://github.com/Shaykkoo', 
    },
    {
      pretitle: 'Développeur Frontend',
      title: 'Batyste Chauvet',
      description: 'Batyste a conçu l’aspect visuel du projet et a créé la structure du site afin de donner une bonne expérience utilisateur. Il a fait le pivot Back- Front.',
      action: 'Voir GitHub',
      position: 'end',
      link: 'https://github.com/Batyeste', 
    }
  ];

  return (
    <div className="container">
        <h1 className="text-center my-4">L’équipe du projet</h1>
        <div className="row">
            {teamMembers.map((member, index) => (
                <Card
                    key={index}
                    pretitle={member.pretitle}
                    title={member.title}
                    description={member.description}
                    action={<a href={member.link} target="_blank" rel="noopener noreferrer">{member.action}</a>}
                    position={member.position}
                />
            ))}
        </div>
    </div>
);
}
