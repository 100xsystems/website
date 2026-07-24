import { HomeFeed } from '@/presentation/features/homeFeed.feature';
import { HomeSearch } from '@/presentation/features/homeSearch.feature';
import { HomeYC } from '@/presentation/features/homeYC.feature';
import { HomeProductHunt } from '@/presentation/features/homeProductHunt.feature';

export default function HomePage() {
  return (
    <>
      <HomeFeed />
      <HomeYC />
      <HomeProductHunt />
      <HomeSearch />
    </>
  );
}
