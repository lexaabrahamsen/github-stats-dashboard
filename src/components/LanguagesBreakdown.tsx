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
      <CardHeader
        sx={{ color: '#ffffff' }}
        title="Languages Breakdown"
        subheader="subheader"
      />
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
      />
    </Card>
  );
};
