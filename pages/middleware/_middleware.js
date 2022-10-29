export default function middleware(req) {
  const country = req.geo?.country;
    return {
        redirect: {
            destination: `/?country=${country}`,
            permanent: false,
        },
    };
}