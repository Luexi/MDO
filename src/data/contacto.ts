/**
 * Fuente unica de los datos de contacto del programa.
 *
 * Antes de este archivo el sitio mostraba dos correos distintos de la misma
 * coordinacion (uno en el footer y otro en la pagina de convocatoria), lo que
 * dividia la atencion del aspirante justo en el momento de mayor intencion.
 * Cualquier superficie que muestre contacto debe leer de aqui.
 */

export const contacto = {
  email: "m.direcciondeorganizaciones@uagro.mx",
  telefono: "(747) 472-5678",
  telefonoHref: "tel:+527474725678",
  domicilio:
    "Facultad de Contaduría y Administración, Ciudad Universitaria, Chilpancingo, Gro.",
  horario: "Lunes a viernes de 9:00 a 17:00 h",
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
