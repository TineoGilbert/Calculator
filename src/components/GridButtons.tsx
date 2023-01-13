import { Button, Grid } from "@mui/material";

interface GridDigitalButtonProps {
    digit: string,
    enterDigit: (digit: string) => void;
    xs?: number;
};

export const GridDigitalButton: React.FC<GridDigitalButtonProps> = ({
    digit,
    enterDigit,
    xs = 3
}) => {
    return (
        <Grid item xs={xs}>
            <Button fullWidth variant="outlined" onClick={()=> enterDigit(digit)}>
              {digit}
            </Button>
        </Grid>
    )
}