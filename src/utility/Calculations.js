export default class Calculations {
    static get C0() {
        return 16.35;
    }

    static get A() {
        return 1.059463094359;
    }

    static textNoteToFrequency(note) {
        switch(note) {
            case 'C':
                return Calculations.C0;
            case 'C#':
                return Calculations.noteToFrequency(1);
            case 'D':
                return Calculations.noteToFrequency(2);
            case 'D#':
                return Calculations.noteToFrequency(3);
            case 'E':
                return Calculations.noteToFrequency(4);
            case 'F':
                return Calculations.noteToFrequency(5);
            case 'F#':
                return Calculations.noteToFrequency(6);
            case 'G':
                return Calculations.noteToFrequency(7);
            case 'G#':
                return Calculations.noteToFrequency(8);
            case 'A':
                return Calculations.noteToFrequency(9);
            case 'A#':
                return Calculations.noteToFrequency(10);
            case 'B':
                return Calculations.noteToFrequency(11);
        }
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