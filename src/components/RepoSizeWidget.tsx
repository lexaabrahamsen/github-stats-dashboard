import { Card, CardHeader, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { useTheme } from '@mui/material/styles';

interface RepoSizeDatum {
  name: string;
  size: number;
}

interface RepoSizeWidgetProps {
  repoSizeData: RepoSizeDatum[];
}

export const RepoSizeWidget = ({ repoSizeData }: RepoSizeWidgetProps) => {
  const theme = useTheme(); // ✅ grab theme for primary color

  const hasData = repoSizeData.length > 0;

  return (
    <Card
      sx={{
        backgroundColor: '#111C44',
        borderRadius: '20px',
        padding: '16px',
      }}
    >
      {hasData ? (
        <>
          <CardHeader
            title="Repo Size Breakdown"
            subheader="Top 10 by KB"
            sx={{
              color: 'white',
              paddingBottom: 0,
              mb: 2,
              '& .MuiCardHeader-title': {
                color: 'white',
              },
              '& .MuiCardHeader-subheader': {
                color: '#A0AEC0',
              },
            }}
          />

          <BarChart
            yAxis={[
              {
                data: repoSizeData.map((r) => r.name),
                scaleType: 'band',
                tickLabelStyle: {
                  fill: 'white', // ✅ white y-axis labels
                  fontSize: 12,
                },
              },
            ]}
            xAxis={[
              {
                label: 'Size (KB)',
                tickLabelStyle: {
                  fill: 'white', // ✅ white x-axis labels
                  fontSize: 12,
                },
                labelStyle: {
                  fill: 'white',
                  fontSize: 14,
                },
              },
            ]}
            series={[
              {
                data: repoSizeData.map((r) => r.size),
                color: theme.palette.primary.main, // ✅ use primary color bars
                // barThickness: 20, // ✅ slightly thinner bars
              },
            ]}
            layout="horizontal"
            height={350}
            margin={{ top: 20, right: 20, bottom: 40, left: 120 }}
            grid={{ vertical: true }}
            sx={{
              width: '100%',
              '& .MuiChartsAxis-line, & .MuiChartsGrid-line': {
                stroke: '#333C6B', // ✅ darker gridline color
              },
            }}
          />
        </>
      ) : (
        <Typography sx={{ color: 'white', fontSize: '1rem', textAlign: 'center', mt: 10 }}>
          Nothing to see here yet!
        </Typography>
      )}
    </Card>
  );
};
