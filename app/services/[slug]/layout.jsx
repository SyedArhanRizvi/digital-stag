import data from "@/data.json"

export async function generateMetadata({ params }) {
  const { slug } = params
  const serviceData = data.find(item => item.slug === `/${slug}`)
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service page could not be found.',
    }
  }

  return {
    title: serviceData.meta_title,
    description: serviceData.meta_description,
    keywords: serviceData.meta_keywords,
    openGraph: {
      title: serviceData.meta_title,
      description: serviceData.meta_description,
      type: 'website',
      url: `https://digitalstag.in/services/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: serviceData.meta_title,
      description: serviceData.meta_description,
    },
    alternates: {
      canonical: `https://digitalstag.in/services/${slug}`,
    },
  }
}

export default function ServiceLayout({ children }) {
  return <>{children}</>
}