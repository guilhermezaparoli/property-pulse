const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
async function fetchProperties({showFeatured = false} = {}) {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties${showFeatured ? "/featured": ''}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface fetchPropertyProps {
    id: string
}
async function fetchProperty({id}: fetchPropertyProps): Promise<any> {
    console.log(id)
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`, {cache: "no-store"});

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
