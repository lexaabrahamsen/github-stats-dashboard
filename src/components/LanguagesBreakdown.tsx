import { Card, CardHeader } from '@mui/material';
import { PieChart } from '@mui/x-charts';

interface LanguageDatum {
  id: string;
  label: string;
  value: number;
}

interface LanguagesBreakdownProps {
  languageData: LanguageDatum[];
}

export const LanguagesBreakdown = ({ languageData }: LanguagesBreakdownProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#111C44',
        borderRadius: '20px',
        padding: '16px',
      }}
    >
            <CardHeader title="Languages Breakdown" sx={{ paddingBottom: '0', color: 'white', mb: 2 }} />

      <PieChart
        series={[
          {
            data: languageData,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: 'gray',
            },
            valueFormatter: (item: any) => `${item.value} bytes`,
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            direction: 'column',
            labelStyle: {
              fill: 'white',
            },
          },
        }}
        sx={{
          margin: '0 auto',
          '& .MuiPieArc-root': {
            stroke: 'transparent',
          },
          '& .MuiChartsLegend-mark': {
            width: 12,
            height: 12,
          },
          '& .MuiChartsLegend-series text': {
            fill: 'white',
          },
        }}
      />
    </Card>
  );
};
