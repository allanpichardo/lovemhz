export default class Calculations {
    static get C0() {
        return 16.35;
    }

    static get A() {
        return 1.059463094359;
    }

    static noteToFrequency(hsAboveC0) {
        return Calculations.C0 * Math.pow(Calculations.A, hsAboveC0);
    }

    static shiftToOctave(frequency, octave) {
        for(let i = 0; i < octave; ++i) {
            frequency *= 2;
        }

        return frequency;
    }
}