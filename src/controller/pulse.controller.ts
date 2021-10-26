import {
  Body,
  Controller,
  HttpCode,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PulseServiceInterface } from 'src/application/pulse.service.interface';
import { EntityNotFoundError } from 'typeorm';
import { PulseRequestDto } from './dtos/pulse-reqeust.dto';

@ApiTags('Pulse')
@Controller('pulse')
export class PulseController {
  private pulseService: PulseServiceInterface;

  constructor(@Inject('PulseService') pulseService: PulseServiceInterface) {
    this.pulseService = pulseService;
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Updates the state of a device.',
    description:
      'Sets last_seen to the current timestamp, pulse_type to the received type and resets mail_sent to false.',
  })
  @ApiOkResponse({
    description: 'State of device was successfully updated.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid value(s).',
  })
  @ApiNotFoundResponse({
    description: 'Device not found.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  async beat(@Body() pulseRequestDto: PulseRequestDto): Promise<void> {
    try {
      await this.pulseService.beat(
        pulseRequestDto.deviceId,
        pulseRequestDto.type,
      );
      return;
    } catch (error) {
      console.error(error);
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
