class ConstructionGame {
  private length: number;
  private width: number;
  private cubes: boolean[][];

  constructor(length: number, width: number) {
    this.length = length;
    this.width = width;
    this.cubes = [];
  }

  public addCubes(cubes: boolean[][]): void {
    this.cubes = cubes
  }

  public getHeight(): number {
    let height = 0;
    for (let i = 0; i < this.length; i++) {
      let hasCube = false;
      for (let j = 0; j < this.width; j++) {
        if (this.cubes[i][j]) {
          hasCube = true;
        }
      }
      if (hasCube) {
        height++;
      }
    }
    return height;
  }
}

export default ConstructionGame;