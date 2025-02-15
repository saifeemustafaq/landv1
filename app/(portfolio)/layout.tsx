import PortfolioLayout from '../components/PortfolioLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortfolioLayout>{children}</PortfolioLayout>;
} 