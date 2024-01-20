import CloseEye from "@assets/icons/close_eye.svg";
import OpenEye from "@assets/icons/open_eye.svg";
import { IIconList } from "@global/styles/icons";
import { IColor } from "@global/styles/colors";
import theme from "@global/styles/theme";

type Props = {
  type: IIconList;
  error?: boolean;
  width?: number;
  height?: number;
  color?: IColor;
};

export function Icon({ type, error, width = 24, height = 24, color }: Props) {
  const iconList: { [k in IIconList]: JSX.Element } = {
    closeEye: (
      <CloseEye
        width={width}
        height={height}
        color={
          color ? (error ? "red" : theme.colors[color]) : theme.colors.GRAY
        }
      />
    ),
    openEye: (
      <OpenEye
        width={width}
        height={height}
        color={
          color ? (error ? "red" : theme.colors[color]) : theme.colors.GRAY
        }
      />
    ),
  };

  return iconList[type];
}
