/**
 * Fuente unica de los datos de contacto del programa.
 *
 * FUENTE RECTORA: `public/convocatoria.webp`, el cartel oficial. Los datos de
 * abajo se tomaron de su bloque "Datos de contacto".
 *
 * Antes de este archivo el sitio mostraba dos correos distintos de la misma
 * coordinacion (uno en el footer y otro en la pagina de convocatoria), y un
 * telefono y un domicilio que no coinciden con los del cartel: publicaba
 * (747) 472-5678 y Ciudad Universitaria, Chilpancingo, mientras el cartel
 * indica un numero de Acapulco y la sede de Av. Ruiz Cortines.
 */

export const contacto = {
  coordinador: "Dr. Rubén Hernández Chavarría",
  email: "m.direcciondeorganizaciones@uagro.mx",
  telefono: "744 134 0900 ext. 4477",
  // El `tel:` no incluye la extension porque su marcado no es uniforme entre
  // dispositivos. La extension queda visible en el texto del enlace.
  telefonoHref: "tel:+527441340900",
  domicilio: "Av. Ruiz Cortines s/n, Col. Alta Progreso, Acapulco, Gro.",
  horario: "Lunes a viernes de 9:00 a 17:00 h",
  sitioOficial: "https://www.maestriadirecciondeorganizaciones.uagro.mx/",
} as const;

/**
 * Solo se listan redes con cuenta real y verificada del programa.
 * Twitter y LinkedIn apuntaban a las portadas genericas de esas redes,
 * asi que se retiraron hasta que existan cuentas propias.
 */
export const redesSociales = [
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100087158498251",
  },
] as const;
