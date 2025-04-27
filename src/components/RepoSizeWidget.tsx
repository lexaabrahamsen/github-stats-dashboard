import { Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

interface RepoSizeDatum {
  name: string;
  size: number;
}

interface RepoSizeWidgetProps {
  repoSizeData: RepoSizeDatum[];
}
export const RepoSizeWidget = ({ repoSizeData }: RepoSizeWidgetProps) => {
  return (
    <Card
      sx={{
        padding: '16px',
        backgroundColor: '#111C44',
        borderRadius: '20px',
      }}
    >
      <Typography variant="h6" sx={{ marginTop: '40px', color: 'white' }}>
        Repo Size Breakdown (Top 10 by KB)
      </Typography>
      <BarChart
        yAxis={[
          {
            data: repoSizeData.map((r) => r.name),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: repoSizeData.map((r) => r.size),
            label: 'Size (KB)',
          },
        ]}
        height={400}
        margin={{ top: 20, right: 20, bottom: 20, left: 120 }}
        layout="horizontal"
      />
    </Card>
  );
};
