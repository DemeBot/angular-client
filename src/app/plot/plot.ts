export class Plot {
    // DB assigned ID. Should only be generated by DB, therfore is readonly.
    readonly id?: number;

    // Plot Radius
    radius: number;

    // Plot Arc Angle
    angle: number;

    // Plot Height
    height: number;

    // Track Width
    trackWidth: number;

    // Pole Radius
    poleRadius: number;
}