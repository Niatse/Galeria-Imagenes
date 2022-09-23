import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async ( req: NextApiRequest,
  res: NextApiResponse) => {
  await res.revalidate("/");

  const pathToRevalidate = `/${
    req.body?.record?.id || req.body?.old_record?.id
  }`;
  await res.revalidate(pathToRevalidate);

  return res.send({ revalidated: true });
};

export default handler;