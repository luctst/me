'use client'
import { useMemo, useState } from 'react';
import loader from '@/public/loader.json'

export default function Loading({ footerLinks }) {
  const [available, setAvailable] = useState(true);

	const loaderContent = useMemo(() => {
		return loader[0]?.split('\n').map(content => ({content, active: false, pl: Math.floor(Math.random() * ((50 - 0) - 0 + 1) - 0 + 1)}))
	}, [])

  const start = () => setAvailable(false);
  const finish = () => setAvailable(true);

  if (available) return null;

  return (
		<main>
			<div>
			</div>
		</main>
  );
};

