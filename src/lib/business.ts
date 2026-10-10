export const BUSINESS = {
  name: "Trisha Interiors And Designs",
  phoneDisplay: "+91 75178 55177",
  phoneTel: "+917517855177",
  whatsapp: "917517855177",
  address:
    "Kamgar Chowk, Mayanagar Colony, Cidco, Chhatrapati Sambhajinagar, Maharashtra, India — 431007",
  hours: "9:00 AM – 10:00 PM, Monday to Sunday",
  instagram: "https://www.instagram.com/trisha_interiors_and__designs?obrf=ZDNlZDc0MzIxNw==",
  maps:
    "https://www.google.com/maps/dir/?api=1&destination=Trisha+Interiors+And+Designs%2C+Kamgar+Chowk%2C+Mayanagar+Colony%2C+Cidco%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra+431007%2C+India",
};

export const DEFAULT_WA_MESSAGE =
  "Hello Trisha Interiors And Designs, I would like to discuss an interior design project. Please let me know how we can proceed.";

export function waLink(message: string = DEFAULT_WA_MESSAGE) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(service: string) {
  return `Hello Trisha Interiors And Designs, I am interested in ${service}. Please let me know how we can proceed.`;
}
